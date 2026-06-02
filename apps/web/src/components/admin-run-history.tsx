"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { formatApiError } from "@/lib/format";
import { fetchRunHistory } from "@/lib/run-history-api";
import type {
  ApiErrorResponse,
  RunHistoryItem,
  RunStatus,
} from "@/lib/types";

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; runs: RunHistoryItem[] }
  | { status: "error"; error: ApiErrorResponse };

export function AdminRunHistory() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

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
        {state.status === "loaded" ? <RunHistoryTable runs={state.runs} /> : null}
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

function RunHistoryTable({ runs }: { runs: RunHistoryItem[] }) {
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
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
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
