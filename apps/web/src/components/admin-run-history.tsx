"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format";
import { fetchRunDetail, fetchRunHistory } from "@/lib/run-history-api";
import type {
  ApiErrorResponse,
  RunDetailResponse,
  RunHistoryItem,
  RunStatus,
} from "@/lib/types";

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; runs: RunHistoryItem[] }
  | { status: "error"; error: ApiErrorResponse };

type DetailState =
  | { status: "idle" }
  | { status: "loading"; runId: string }
  | { status: "loaded"; detail: RunDetailResponse }
  | { status: "error"; runId: string; error: ApiErrorResponse };

export function AdminRunHistory() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [detailState, setDetailState] = useState<DetailState>({
    status: "idle",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadRuns() {
      try {
        const result = await fetchRunHistory();
        if (cancelled) {
          return;
        }

        if (result.ok) {
          setState({ status: "loaded", runs: result.data.runs });
        } else {
          setState({ status: "error", error: result.error });
        }
      } catch {
        if (!cancelled) {
          setState({
            status: "error",
            error: {
              detail: "Unable to load persisted run history from the local proxy.",
              suggested_action: "Confirm the Next.js dev server is running.",
            },
          });
        }
      }
    }

    void loadRuns();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSelectRun(runId: string) {
    setDetailState({ status: "loading", runId });

    try {
      const result = await fetchRunDetail(runId);
      if (result.ok) {
        setDetailState({ status: "loaded", detail: result.data });
      } else {
        setDetailState({ status: "error", runId, error: result.error });
      }
    } catch {
      setDetailState({
        status: "error",
        runId,
        error: {
          detail: "Unable to load persisted run detail from the local proxy.",
          suggested_action: "Confirm the Next.js dev server is running.",
        },
      });
    }
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-normal text-foreground">
                Admin run history
              </h1>
              <Badge>Read-only</Badge>
            </div>
            <Link
              className="inline-flex min-h-9 items-center rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground shadow-panel hover:bg-muted"
              href="/"
            >
              Lead demo
            </Link>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Persisted automation runs from the local backend run-history endpoint.
          </p>
        </header>

        {state.status === "loading" ? <LoadingState /> : null}
        {state.status === "error" ? <ErrorState error={state.error} /> : null}
        {state.status === "loaded" ? (
          <>
            <RunHistoryTable runs={state.runs} onSelectRun={handleSelectRun} />
            <RunDetailPanel state={detailState} />
          </>
        ) : null}
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <section
      className="rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
      role="status"
    >
      Loading persisted run history...
    </section>
  );
}

function ErrorState({ error }: { error: ApiErrorResponse }) {
  return (
    <section
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-danger"
      role="alert"
    >
      <h2 className="text-base font-semibold">Unable to load run history</h2>
      <p className="mt-2">{formatApiError(error)}</p>
    </section>
  );
}

function RunHistoryTable({
  runs,
  onSelectRun,
}: {
  runs: RunHistoryItem[];
  onSelectRun: (runId: string) => void;
}) {
  if (runs.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
        No persisted automation runs yet.
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-4 shadow-panel">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-base font-semibold">Persisted runs</h2>
        <p className="text-sm text-muted-foreground">
          {runs.length} automation {runs.length === 1 ? "run" : "runs"} shown.
        </p>
      </div>

      <div className="overflow-x-auto" data-testid="run-history-table">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Created
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">Run</th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">Lead</th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Status
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Source
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Attempts
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Latest attempt
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Failure detail
              </th>
              <th className="px-3 py-2 font-semibold text-muted-foreground">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr className="border-b border-border align-top" key={run.run_id}>
                <td className="px-3 py-3">
                  <p>{formatTimestamp(run.created_at)}</p>
                  <p className="text-muted-foreground">
                    Updated {formatTimestamp(run.updated_at)}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <p className="break-all font-medium">{run.run_id}</p>
                  <p className="break-all text-muted-foreground">{run.lead_id}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="break-all font-medium">
                    {run.email ?? run.lead_id}
                  </p>
                  {run.company_name ? <p>{run.company_name}</p> : null}
                  {run.company_domain ? (
                    <p className="break-all text-muted-foreground">
                      {run.company_domain}
                    </p>
                  ) : null}
                </td>
                <td className="px-3 py-3">
                  <Badge tone={runStatusTone(run.run_status)}>
                    {run.run_status}
                  </Badge>
                </td>
                <td className="px-3 py-3">{run.source}</td>
                <td className="px-3 py-3">{run.attempt_count}</td>
                <td className="px-3 py-3">
                  {run.latest_attempt ? (
                    <div className="max-w-md">
                      <p>
                        Attempt {run.latest_attempt.attempt_number}:{" "}
                        {run.latest_attempt.status}
                      </p>
                      {run.latest_attempt.error_type ? (
                        <p className="text-muted-foreground">
                          Error type: {run.latest_attempt.error_type}
                        </p>
                      ) : null}
                      <p className="text-muted-foreground">
                        {run.latest_attempt.summary}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      No attempts recorded.
                    </span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <Badge
                    tone={
                      run.failure_detail_available ? "warning" : "neutral"
                    }
                  >
                    {run.failure_detail_available ? "Available" : "None"}
                  </Badge>
                </td>
                <td className="px-3 py-3">
                  <Button
                    aria-label={`View details for ${run.run_id}`}
                    className="h-9 px-3"
                    onClick={() => onSelectRun(run.run_id)}
                    variant="secondary"
                  >
                    View details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RunDetailPanel({ state }: { state: DetailState }) {
  if (state.status === "idle") {
    return (
      <section
        className="rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
        data-testid="run-detail-panel"
      >
        Select a run to inspect read-only details.
      </section>
    );
  }

  if (state.status === "loading") {
    return (
      <section
        className="rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
        data-testid="run-detail-panel"
        role="status"
      >
        Loading run details for {state.runId}...
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-danger"
        data-testid="run-detail-panel"
        role="alert"
      >
        <h2 className="text-base font-semibold">Unable to load run detail</h2>
        <p className="mt-2">
          {state.runId}: {formatApiError(state.error)}
        </p>
      </section>
    );
  }

  const { detail } = state;

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4 shadow-panel"
      data-testid="run-detail-panel"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Run detail</h2>
          <p className="break-all text-sm text-muted-foreground">{detail.run_id}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={runStatusTone(detail.run_status)}>{detail.run_status}</Badge>
          <Badge>Read-only</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <DetailSection title="Lead and run">
            <KeyValueList
              entries={[
                ["Lead email", detail.email],
                ["Company", detail.company_name],
                ["Domain", detail.company_domain],
                ["Lead ID", detail.lead_id],
                ["Source", detail.source],
                ["Created", formatTimestamp(detail.created_at)],
                ["Updated", formatTimestamp(detail.updated_at)],
                [
                  "Failure detail",
                  detail.failure_detail_available ? "Available" : "None",
                ],
              ]}
            />
          </DetailSection>

          <DetailSection title="Safe intake payload">
            <PayloadList payload={detail.intake_payload} />
          </DetailSection>
        </div>

        <div className="space-y-4">
          <DetailSection title="Attempts">
            {detail.attempts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No attempts recorded for this run.
              </p>
            ) : (
              <div className="space-y-3">
                {detail.attempts.map((attempt) => (
                  <div
                    className="rounded-md border border-border bg-background p-3"
                    key={attempt.attempt_number}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">
                        Attempt {attempt.attempt_number}
                      </p>
                      <Badge tone={runStatusTone(attempt.status)}>
                        {attempt.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      {formatTimestamp(attempt.created_at)}
                    </p>
                    {attempt.error_type ? (
                      <p className="mt-2">Error type: {attempt.error_type}</p>
                    ) : null}
                    {attempt.error_message ? (
                      <p className="mt-2 text-muted-foreground">
                        Error: {attempt.error_message}
                      </p>
                    ) : null}
                    {attempt.suggested_action ? (
                      <p className="mt-2 text-muted-foreground">
                        Suggested action: {attempt.suggested_action}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </DetailSection>

          <DetailSection title="Persisted mock/audit results">
            {detail.audit_events.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No allowlisted audit result data exists for this run.
              </p>
            ) : (
              <div className="space-y-3">
                {detail.audit_events.map((event) => (
                  <div
                    className="rounded-md border border-border bg-background p-3"
                    key={`${event.event_type}-${event.created_at}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{event.event_type}</p>
                      <p className="text-muted-foreground">
                        {formatTimestamp(event.created_at)}
                      </p>
                    </div>
                    <PayloadList payload={event.payload} />
                  </div>
                ))}
              </div>
            )}
          </DetailSection>
        </div>
      </div>
    </section>
  );
}

function DetailSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

function KeyValueList({ entries }: { entries: Array<[string, string]> }) {
  return (
    <dl className="grid grid-cols-[minmax(8rem,0.45fr)_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
      {entries.map(([label, value]) => (
        <div className="contents" key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="break-all">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function PayloadList({ payload }: { payload: Record<string, unknown> }) {
  const entries = Object.entries(payload);
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No safe payload fields.</p>;
  }

  return (
    <dl className="mt-2 grid grid-cols-[minmax(8rem,0.45fr)_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
      {entries.map(([label, value]) => (
        <div className="contents" key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="break-all">{formatPayloadValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function formatPayloadValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "None";
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatPayloadValue(item)).join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number" || typeof value === "string") {
    return String(value);
  }
  return JSON.stringify(value);
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function runStatusTone(status: RunStatus): "neutral" | "success" | "warning" | "danger" {
  if (status === "success") {
    return "success";
  }
  if (status === "failed") {
    return "danger";
  }
  if (status === "queued") {
    return "warning";
  }
  return "neutral";
}
