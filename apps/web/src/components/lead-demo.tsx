"use client";

import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parseLeadCsv, type CsvParseError } from "@/lib/csv";
import { formatApiError, leadSourceLabel, statusLabel } from "@/lib/format";
import { submitLeadIntake } from "@/lib/intake-api";
import { findSameSessionDuplicate } from "@/lib/session";
import type {
  LeadIntakeRequest,
  LeadSource,
  SubmissionRecord,
  SubmissionStatus,
} from "@/lib/types";

const storageKey = "salesops.phase3.submissions";

const initialFormState = {
  email: "",
  first_name: "",
  last_name: "",
  company_name: "",
  company_domain: "",
  source: "demo_form" as LeadSource,
  job_title: "",
  phone: "",
  message: "",
  lead_score: "80",
};

const sampleCsv = [
  "email,first_name,last_name,company_name,company_domain,lead_score,job_title",
  "grace@example.com,Grace,Hopper,Example Co,example.com,88,Director",
].join("\n");

type FormState = typeof initialFormState;

export function LeadDemo() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [records, setRecords] = useState<SubmissionRecord[]>([]);
  const [latestRecord, setLatestRecord] = useState<SubmissionRecord | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [csvSubmitting, setCsvSubmitting] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [csvErrors, setCsvErrors] = useState<CsvParseError[]>([]);
  const [csvSummary, setCsvSummary] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedRecords = window.sessionStorage.getItem(storageKey);
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords) as SubmissionRecord[];
      setRecords(parsedRecords);
      setLatestRecord(parsedRecords[0] ?? null);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.sessionStorage.setItem(storageKey, JSON.stringify(records));
    }
  }, [hydrated, records]);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitting(true);
    const record = await createSubmissionRecord(buildPayload(form), "form", records);
    setRecords((currentRecords) => [record, ...currentRecords]);
    setLatestRecord(record);
    setFormSubmitting(false);
  }

  async function handleCsvImport() {
    setCsvSubmitting(true);
    setCsvErrors([]);
    setCsvSummary("");
    const parsedCsv = parseLeadCsv(csvText);
    setCsvErrors(parsedCsv.errors);

    if (parsedCsv.leads.length === 0) {
      setCsvSummary(`0 of ${parsedCsv.totalRows} rows submitted.`);
      setCsvSubmitting(false);
      return;
    }

    let nextRecords = [...records];
    const importedRecords: SubmissionRecord[] = [];
    for (const lead of parsedCsv.leads) {
      const record = await createSubmissionRecord(lead, "csv", nextRecords);
      nextRecords = [record, ...nextRecords];
      importedRecords.push(record);
    }

    setRecords(nextRecords);
    setLatestRecord(importedRecords[importedRecords.length - 1] ?? null);
    setCsvSummary(
      `${importedRecords.length} of ${parsedCsv.totalRows} rows submitted locally.`
    );
    setCsvSubmitting(false);
  }

  async function createSubmissionRecord(
    payload: LeadIntakeRequest,
    origin: "form" | "csv",
    previousRecords: SubmissionRecord[]
  ): Promise<SubmissionRecord> {
    const duplicateHint = findSameSessionDuplicate(previousRecords, payload);
    const submittedAt = new Date().toISOString();

    try {
      const result = await submitLeadIntake(payload);
      if (result.ok) {
        return {
          id: result.data.run_id,
          submittedAt,
          origin,
          payload,
          statusCode: result.status,
          status: "success",
          duplicateHint,
          response: result.data,
        };
      }

      return {
        id: createLocalSubmissionId(),
        submittedAt,
        origin,
        payload,
        statusCode: result.status,
        status: result.status === 422 ? "validation_error" : "error",
        duplicateHint,
        error: result.error,
      };
    } catch {
      return {
        id: createLocalSubmissionId(),
        submittedAt,
        origin,
        payload,
        statusCode: null,
        status: "error",
        duplicateHint,
        error: {
          detail: "Unable to submit to the local Next.js proxy.",
          suggested_action: "Confirm the frontend dev server is running.",
        },
      };
    }
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex min-w-0 flex-col gap-3 border-b border-border pb-5">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="min-w-0 text-2xl font-semibold tracking-normal text-foreground">
                SalesOps Workflow Automation Hub
              </h1>
            </div>
            <Link
              className="inline-flex min-h-9 shrink-0 items-center rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground shadow-panel transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="/admin/runs"
            >
              Admin runs
            </Link>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Capture synthetic form and CSV leads, surface validation and dedupe
            outcomes, and review mock CRM/Slack automation results in a
            browser-session dashboard.
          </p>
        </header>

        <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
          <LeadForm
            form={form}
            onChange={setForm}
            onSubmit={handleFormSubmit}
            submitting={formSubmitting}
          />
          <CsvImport
            csvText={csvText}
            errors={csvErrors}
            summary={csvSummary}
            submitting={csvSubmitting}
            onCsvTextChange={setCsvText}
            onImport={handleCsvImport}
          />
        </section>

        <LatestResult record={latestRecord} />
        <SubmissionDashboard records={records} />
      </div>
    </main>
  );
}

function LeadForm({
  form,
  onChange,
  onSubmit,
  submitting,
}: {
  form: FormState;
  onChange: (form: FormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}) {
  function updateField<Field extends keyof FormState>(
    field: Field,
    value: FormState[Field]
  ) {
    onChange({ ...form, [field]: value });
  }

  return (
    <form
      className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel"
      onSubmit={onSubmit}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Lead intake form</h2>
        <Badge tone="neutral">Validated intake</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" required>
          <Input
            id="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            required
            type="email"
            value={form.email}
          />
        </Field>
        <Field label="Company domain" required>
          <Input
            id="company_domain"
            name="company_domain"
            onChange={(event) =>
              updateField("company_domain", event.target.value)
            }
            required
            value={form.company_domain}
          />
        </Field>
        <Field label="First name" required>
          <Input
            id="first_name"
            name="first_name"
            onChange={(event) => updateField("first_name", event.target.value)}
            required
            value={form.first_name}
          />
        </Field>
        <Field label="Last name" required>
          <Input
            id="last_name"
            name="last_name"
            onChange={(event) => updateField("last_name", event.target.value)}
            required
            value={form.last_name}
          />
        </Field>
        <Field label="Company name" required>
          <Input
            id="company_name"
            name="company_name"
            onChange={(event) => updateField("company_name", event.target.value)}
            required
            value={form.company_name}
          />
        </Field>
        <Field label="Source" required>
          <Select
            id="source"
            name="source"
            onChange={(event) =>
              updateField("source", event.target.value as LeadSource)
            }
            value={form.source}
          >
            <option value="demo_form">{leadSourceLabel("demo_form")}</option>
            <option value="csv_upload">{leadSourceLabel("csv_upload")}</option>
            <option value="manual">{leadSourceLabel("manual")}</option>
          </Select>
        </Field>
        <Field label="Job title">
          <Input
            id="job_title"
            name="job_title"
            onChange={(event) => updateField("job_title", event.target.value)}
            value={form.job_title}
          />
        </Field>
        <Field label="Phone">
          <Input
            id="phone"
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            value={form.phone}
          />
        </Field>
        <Field label="Lead score" required>
          <Input
            id="lead_score"
            max={100}
            min={0}
            name="lead_score"
            onChange={(event) => updateField("lead_score", event.target.value)}
            required
            type="number"
            value={form.lead_score}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message">
          <Textarea
            id="message"
            name="message"
            onChange={(event) => updateField("message", event.target.value)}
            value={form.message}
          />
        </Field>
      </div>

      <div className="mt-5 flex justify-end">
        <Button disabled={submitting} type="submit">
          {submitting ? "Submitting..." : "Submit lead"}
        </Button>
      </div>
    </form>
  );
}

function CsvImport({
  csvText,
  errors,
  summary,
  submitting,
  onCsvTextChange,
  onImport,
}: {
  csvText: string;
  errors: CsvParseError[];
  summary: string;
  submitting: boolean;
  onCsvTextChange: (text: string) => void;
  onImport: () => void;
}) {
  const [selectedFileName, setSelectedFileName] = useState("No file selected");

  async function handleFileChange(file: File | undefined) {
    if (!file) {
      setSelectedFileName("No file selected");
      return;
    }
    setSelectedFileName(file.name);
    onCsvTextChange(await file.text());
  }

  return (
    <section className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">CSV import</h2>
        <Badge tone="neutral">CSV upload</Badge>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="csv_file" id="csv_file_label">
            CSV file
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:bg-teal-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/30 focus-within:ring-offset-2 focus-within:ring-offset-background sm:w-auto">
              <span id="csv_file_button_text">Choose CSV file</span>
              <input
                accept=".csv,text/csv"
                aria-describedby="csv_file_name"
                aria-labelledby="csv_file_label csv_file_button_text"
                className="absolute inset-0 cursor-pointer opacity-0"
                id="csv_file"
                onChange={(event) => handleFileChange(event.target.files?.[0])}
                type="file"
              />
            </div>
            <p
              aria-live="polite"
              className="min-w-0 truncate text-sm text-muted-foreground"
              id="csv_file_name"
              title={selectedFileName}
            >
              {selectedFileName}
            </p>
          </div>
        </div>
        <Field label="CSV input">
          <Textarea
            id="csv_input"
            onChange={(event) => onCsvTextChange(event.target.value)}
            placeholder={sampleCsv}
            rows={8}
            value={csvText}
          />
        </Field>
        {errors.length > 0 ? (
          <div
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-danger"
            role="alert"
          >
            {errors.map((error) => (
              <p key={`${error.rowNumber}-${error.message}`}>
                Row {error.rowNumber}: {error.message}
              </p>
            ))}
          </div>
        ) : null}
        {summary ? (
          <p className="text-sm text-muted-foreground" data-testid="csv-summary">
            {summary}
          </p>
        ) : null}
        <div className="flex justify-end">
          <Button disabled={submitting} onClick={onImport} type="button">
            {submitting ? "Importing..." : "Import rows"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function LatestResult({ record }: { record: SubmissionRecord | null }) {
  if (!record) {
    return (
      <section className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">Latest result</h2>
        <p className="mt-1">
          Submit a lead or import CSV rows to see validation, dedupe, CRM, and
          Slack outcomes here.
        </p>
      </section>
    );
  }

  const tone = statusTone(record.status);

  return (
    <section
      className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel"
      data-testid="latest-result"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">Latest result</h2>
        <Badge tone={tone}>{statusLabel(record)}</Badge>
        <Badge tone={record.duplicateHint.status === "none" ? "neutral" : "warning"}>
          {record.duplicateHint.message}
        </Badge>
      </div>
      {record.status === "success" && record.response ? (
        <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Run" value={record.response.run_id} />
          <Metric label="Backend dedupe" value={record.response.dedupe.status} />
          <Metric label="CRM" value={record.response.crm.action} />
          <Metric
            label="Slack"
            value={record.response.slack ? "sent" : "skipped"}
          />
        </div>
      ) : (
        <p className="text-sm text-danger">{formatApiError(record.error)}</p>
      )}
    </section>
  );
}

function SubmissionDashboard({ records }: { records: SubmissionRecord[] }) {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dedupeFilter, setDedupeFilter] = useState("all");
  const [query, setQuery] = useState("");
  const hasActiveFilters =
    sourceFilter !== "all" ||
    statusFilter !== "all" ||
    dedupeFilter !== "all" ||
    query.trim().length > 0;

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const backendDedupe = record.response?.dedupe.status ?? "n/a";
      const matchesSource =
        sourceFilter === "all" || record.payload.source === sourceFilter;
      const matchesStatus =
        statusFilter === "all" || record.status === statusFilter;
      const matchesDedupe =
        dedupeFilter === "all" ||
        backendDedupe === dedupeFilter ||
        record.duplicateHint.status === dedupeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        record.payload.email.toLowerCase().includes(normalizedQuery) ||
        record.payload.company_domain.toLowerCase().includes(normalizedQuery);

      return matchesSource && matchesStatus && matchesDedupe && matchesQuery;
    });
  }, [dedupeFilter, query, records, sourceFilter, statusFilter]);

  const columns = useMemo<ColumnDef<SubmissionRecord>[]>(
    () => [
      {
        header: "Submitted",
        cell: ({ row }) => (
          <span>{new Date(row.original.submittedAt).toLocaleString()}</span>
        ),
      },
      {
        header: "Lead",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p
              className="truncate font-medium"
              title={row.original.payload.email}
            >
              {row.original.payload.email}
            </p>
            <p
              className="truncate text-muted-foreground"
              title={`${row.original.payload.company_name} / ${row.original.payload.company_domain}`}
            >
              {row.original.payload.company_name} /{" "}
              {row.original.payload.company_domain}
            </p>
          </div>
        ),
      },
      {
        header: "Source",
        cell: ({ row }) => leadSourceLabel(row.original.payload.source),
      },
      {
        header: "Result",
        cell: ({ row }) => (
          <Badge tone={statusTone(row.original.status)}>
            {statusLabel(row.original)}
          </Badge>
        ),
      },
      {
        header: "Backend dedupe",
        cell: ({ row }) => row.original.response?.dedupe.status ?? "n/a",
      },
      {
        header: "Session hint",
        cell: ({ row }) => row.original.duplicateHint.message,
      },
      {
        header: "Details",
        cell: ({ row }) =>
          row.original.status === "success" && row.original.response ? (
            <span className="break-words">
              {row.original.response.crm.action}; Slack{" "}
              {row.original.response.slack ? "sent" : "skipped"}
            </span>
          ) : (
            <span className="break-words">{formatApiError(row.original.error)}</span>
          ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel">
      <div className="mb-4 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold">Session dashboard</h2>
          <p className="text-sm text-muted-foreground">
            {filteredRecords.length} of {records.length} local submissions shown.
          </p>
        </div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Filter by source">
            <Select
              id="filter_source"
              onChange={(event) => setSourceFilter(event.target.value)}
              value={sourceFilter}
            >
              <option value="all">All</option>
              <option value="demo_form">{leadSourceLabel("demo_form")}</option>
              <option value="csv_upload">{leadSourceLabel("csv_upload")}</option>
              <option value="manual">{leadSourceLabel("manual")}</option>
            </Select>
          </Field>
          <Field label="Filter by result">
            <Select
              id="filter_result"
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="validation_error">Validation failed</option>
              <option value="error">Error</option>
            </Select>
          </Field>
          <Field label="Filter by dedupe">
            <Select
              id="filter_dedupe"
              onChange={(event) => setDedupeFilter(event.target.value)}
              value={dedupeFilter}
            >
              <option value="all">All</option>
              <option value="unique">Backend unique</option>
              <option value="duplicate_email">Backend email duplicate</option>
              <option value="possible_duplicate_domain">Backend domain match</option>
              <option value="same_session_email">Session email match</option>
              <option value="same_session_domain">Session domain match</option>
            </Select>
          </Field>
          <Field label="Search">
            <Input
              id="filter_search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Email or company domain"
              type="search"
              value={query}
            />
          </Field>
        </div>
      </div>

      <div
        aria-label="Scrollable session submissions table"
        className="max-w-full overflow-x-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        data-testid="submission-table"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[960px] table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[145px]" />
            <col className="w-[230px]" />
            <col className="w-[95px]" />
            <col className="w-[125px]" />
            <col className="w-[135px]" />
            <col className="w-[155px]" />
            <col className="w-[220px]" />
          </colgroup>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-3 py-2 font-semibold text-muted-foreground"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr className="border-b border-border align-top" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-3 py-3" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-3 py-6 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  {records.length === 0 ? (
                    "Submit a lead or import CSV rows to populate this dashboard."
                  ) : hasActiveFilters ? (
                    "No submissions match the current filters."
                  ) : (
                    "No local submissions yet."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Field({
  children,
  label,
  required = false,
}: {
  children: ReactNode;
  label: string;
  required?: boolean;
}) {
  const child = children as ReactElement<{ id?: string }>;
  const fieldId = child.props.id;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/60 p-3">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 break-all text-sm font-semibold">{value}</p>
    </div>
  );
}

function buildPayload(form: FormState): LeadIntakeRequest {
  return {
    email: form.email,
    first_name: form.first_name,
    last_name: form.last_name,
    company_name: form.company_name,
    company_domain: form.company_domain,
    source: form.source,
    job_title: optionalFormText(form.job_title),
    phone: optionalFormText(form.phone),
    message: optionalFormText(form.message),
    lead_score: Number.parseInt(form.lead_score, 10),
  };
}

function optionalFormText(value: string): string | undefined {
  const normalized = value.trim();
  return normalized ? normalized : undefined;
}

function createLocalSubmissionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `local_${crypto.randomUUID()}`;
  }
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function statusTone(status: SubmissionStatus): "success" | "warning" | "danger" {
  if (status === "success") {
    return "success";
  }
  if (status === "validation_error") {
    return "warning";
  }
  return "danger";
}
