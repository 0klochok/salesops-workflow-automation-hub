"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type UIEvent,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { formatApiError, leadSourceLabel } from "@/lib/format";
import { fetchRunDetail, fetchRunHistory } from "@/lib/run-history-api";
import { leadSources } from "@/lib/types";
import { cn } from "@/lib/utils";
import type {
  ApiErrorResponse,
  ErrorType,
  LeadSource,
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

type FilterStatus = RunStatus | "all";
type FilterSource = LeadSource | "all";
type FilterErrorType = ErrorType | "all";

type RunHistoryFilters = {
  status: FilterStatus;
  source: FilterSource;
  owner: string;
  errorType: FilterErrorType;
  query: string;
  fromDate: string;
  toDate: string;
};

type SearchParamReader = {
  get(name: string): string | null;
  toString(): string;
};

const RUN_STATUS_OPTIONS = [
  "queued",
  "success",
  "failed",
  "retried",
] as const satisfies readonly RunStatus[];

const RUN_STATUS_SET = new Set<string>(RUN_STATUS_OPTIONS);
const LEAD_SOURCE_SET = new Set<string>(leadSources);
const RUN_ERROR_TYPE_OPTIONS = [
  "validation",
  "adapter",
  "unknown",
] as const satisfies readonly ErrorType[];
const RUN_ERROR_TYPE_SET = new Set<string>(RUN_ERROR_TYPE_OPTIONS);
const HORIZONTAL_DRAG_THRESHOLD_PX = 6;
const MOUSE_DRAG_POINTER_ID = -1;

type HorizontalDragState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  startScrollLeft: number;
  hasDragStarted: boolean;
  suppressClick: boolean;
};

export function AdminRunHistory() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [detailState, setDetailState] = useState<DetailState>({
    status: "idle",
  });
  const lastRequestedRunIdRef = useRef<string | null>(null);
  const filters = useMemo(
    () => parseRunHistoryFilters(searchParams),
    [searchParams]
  );
  const selectedRunId = useMemo(
    () => parseSelectedRunId(searchParams),
    [searchParams]
  );
  const hasActiveFilters = hasRunHistoryFilters(filters);
  const ownerOptions = useMemo(
    () => (state.status === "loaded" ? getRunOwnerOptions(state.runs) : []),
    [state]
  );
  const sourceOptions = useMemo(
    () => (state.status === "loaded" ? getRunSourceOptions(state.runs) : []),
    [state]
  );

  function replaceQuery(nextFilters: RunHistoryFilters, nextRunId: string | null) {
    const queryString = buildRunHistoryQueryString(nextFilters, nextRunId);
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  const loadRunDetail = useCallback(async (runId: string) => {
    lastRequestedRunIdRef.current = runId;
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
  }, []);

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

  useEffect(() => {
    const canonicalQueryString = buildRunHistoryQueryString(filters, selectedRunId);
    const currentQueryString = searchParams.toString();
    if (canonicalQueryString !== currentQueryString) {
      router.replace(
        canonicalQueryString ? `${pathname}?${canonicalQueryString}` : pathname,
        { scroll: false }
      );
    }
  }, [filters, pathname, router, searchParams, selectedRunId]);

  useEffect(() => {
    if (!selectedRunId) {
      lastRequestedRunIdRef.current = null;
      setDetailState({ status: "idle" });
      return;
    }

    if (lastRequestedRunIdRef.current === selectedRunId) {
      return;
    }

    void loadRunDetail(selectedRunId);
  }, [loadRunDetail, selectedRunId]);

  function handleFilterChange(nextFilters: RunHistoryFilters) {
    replaceQuery(nextFilters, selectedRunId);
  }

  function handleResetFilters() {
    replaceQuery(emptyRunHistoryFilters(), selectedRunId);
  }

  function handleSelectRun(runId: string) {
    replaceQuery(filters, runId);
    void loadRunDetail(runId);
  }

  const visibleRuns =
    state.status === "loaded" ? filterRunHistory(state.runs, filters) : [];
  const selectedRunIsFilteredOut =
    state.status === "loaded" &&
    Boolean(selectedRunId) &&
    hasActiveFilters &&
    state.runs.some((run) => run.run_id === selectedRunId) &&
    !visibleRuns.some((run) => run.run_id === selectedRunId);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex min-w-0 flex-col gap-3 border-b border-border pb-5">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="min-w-0 text-2xl font-semibold tracking-normal text-foreground">
                Admin run history
              </h1>
              <Badge>Read-only</Badge>
            </div>
            <Link
              className="inline-flex min-h-9 shrink-0 items-center rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground shadow-panel transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
            <RunHistoryFiltersForm
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              ownerOptions={ownerOptions}
              sourceOptions={sourceOptions}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
            <RunHistoryTable
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
              onSelectRun={handleSelectRun}
              runs={visibleRuns}
              totalRunCount={state.runs.length}
            />
            {selectedRunIsFilteredOut ? (
              <FilteredOutSelectionNotice runId={selectedRunId ?? ""} />
            ) : null}
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
      className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
      role="status"
    >
      Loading persisted run history...
    </section>
  );
}

function ErrorState({ error }: { error: ApiErrorResponse }) {
  return (
    <section
      className="min-w-0 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-danger"
      role="alert"
    >
      <h2 className="text-base font-semibold">Unable to load run history</h2>
      <p className="mt-2 break-words">{formatApiError(error)}</p>
    </section>
  );
}

function RunHistoryFiltersForm({
  filters,
  hasActiveFilters,
  ownerOptions,
  sourceOptions,
  onChange,
  onReset,
}: {
  filters: RunHistoryFilters;
  hasActiveFilters: boolean;
  ownerOptions: string[];
  sourceOptions: LeadSource[];
  onChange: (filters: RunHistoryFilters) => void;
  onReset: () => void;
}) {
  const ownerFilterOptions =
    filters.owner && !ownerOptions.includes(filters.owner)
      ? [filters.owner, ...ownerOptions]
      : ownerOptions;
  const sourceFilterOptions =
    filters.source !== "all" && !sourceOptions.includes(filters.source)
      ? [filters.source, ...sourceOptions]
      : sourceOptions;

  return (
    <section
      aria-label="Run history filters"
      className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel"
    >
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(8rem,0.7fr)_minmax(9rem,0.8fr)_minmax(10rem,1fr)_minmax(9rem,0.8fr)_minmax(14rem,1.4fr)_repeat(2,minmax(9rem,0.7fr))]">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-status-filter">Status</Label>
          <Select
            id="run-status-filter"
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status: normalizeStatusFilter(event.target.value),
              })
            }
          >
            <option value="all">All statuses</option>
            {RUN_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-source-filter">Source</Label>
          <Select
            disabled={sourceFilterOptions.length === 0}
            id="run-source-filter"
            value={filters.source}
            onChange={(event) =>
              onChange({
                ...filters,
                source: normalizeSourceFilter(event.target.value),
              })
            }
          >
            <option value="all">All sources</option>
            {sourceFilterOptions.map((source) => (
              <option key={source} value={source}>
                {leadSourceLabel(source)}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-owner-filter">Owner</Label>
          <Select
            disabled={ownerFilterOptions.length === 0}
            id="run-owner-filter"
            value={filters.owner}
            onChange={(event) =>
              onChange({ ...filters, owner: event.target.value.trim() })
            }
          >
            <option value="">All owners</option>
            {ownerFilterOptions.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-error-type-filter">Error type</Label>
          <Select
            id="run-error-type-filter"
            value={filters.errorType}
            onChange={(event) =>
              onChange({
                ...filters,
                errorType: normalizeErrorTypeFilter(event.target.value),
              })
            }
          >
            <option value="all">All error types</option>
            {RUN_ERROR_TYPE_OPTIONS.map((errorType) => (
              <option key={errorType} value={errorType}>
                {errorType}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-search-filter">Search</Label>
          <Input
            id="run-search-filter"
            placeholder="Run ID, email, lead name, company"
            type="search"
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
          />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-from-filter">From</Label>
          <Input
            id="run-from-filter"
            type="date"
            value={filters.fromDate}
            onChange={(event) =>
              onChange({ ...filters, fromDate: event.target.value })
            }
          />
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="run-to-filter">To</Label>
          <Input
            id="run-to-filter"
            type="date"
            value={filters.toDate}
            onChange={(event) =>
              onChange({ ...filters, toDate: event.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-4 flex min-w-0 justify-stretch sm:justify-end">
        <Button
          className="h-10 w-full px-3 sm:w-auto"
          disabled={!hasActiveFilters}
          onClick={onReset}
          type="button"
          variant="secondary"
        >
          Reset filters
        </Button>
      </div>
    </section>
  );
}

function RunHistoryTable({
  hasActiveFilters,
  runs,
  totalRunCount,
  onResetFilters,
  onSelectRun,
}: {
  hasActiveFilters: boolean;
  runs: RunHistoryItem[];
  totalRunCount: number;
  onResetFilters: () => void;
  onSelectRun: (runId: string) => void;
}) {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const syncTableScrollPosition = useCallback((source: HTMLDivElement) => {
    syncHorizontalScroll(source, topScrollRef.current);
  }, []);
  const dragScroll = useHorizontalDragScroll({
    onScrollLeftChange: syncTableScrollPosition,
  });
  const handleTopScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    syncHorizontalScroll(event.currentTarget, tableScrollRef.current);
  }, []);
  const handleTableScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    syncTableScrollPosition(event.currentTarget);
  }, [syncTableScrollPosition]);

  if (runs.length === 0) {
    if (hasActiveFilters) {
      return (
        <section className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            No runs match these filters.
          </h2>
          <p className="mt-2">
            Clear the current filters to return to the full persisted run list.
          </p>
          <Button
            className="mt-4 h-10 w-full px-3 sm:w-auto"
            onClick={onResetFilters}
            type="button"
            variant="secondary"
          >
            Reset filters
          </Button>
        </section>
      );
    }

    return (
      <section className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground">
        No persisted automation runs yet.
      </section>
    );
  }

  return (
    <section className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-base font-semibold">Persisted runs</h2>
        <p className="text-sm text-muted-foreground">
          {runs.length} automation {runs.length === 1 ? "run" : "runs"} shown.
          {hasActiveFilters ? ` ${totalRunCount} total persisted.` : ""}
        </p>
      </div>

      <div
        aria-label="Top horizontal scroll for persisted runs table"
        className="mb-2 max-w-full overflow-x-auto rounded-md border border-border/70 bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        data-testid="run-history-scroll-rail"
        onScroll={handleTopScroll}
        ref={topScrollRef}
        role="region"
        tabIndex={0}
      >
        <div aria-hidden="true" className="h-3 w-full min-w-[1340px]" />
      </div>
      <div
        aria-label="Scrollable run history table"
        className={cn(
          "max-w-full cursor-grab overflow-x-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          dragScroll.isDragging && "cursor-grabbing select-none"
        )}
        data-testid="run-history-table"
        onClickCapture={dragScroll.handlers.onClickCapture}
        onLostPointerCapture={dragScroll.handlers.onLostPointerCapture}
        onMouseDown={dragScroll.handlers.onMouseDown}
        onMouseLeave={dragScroll.handlers.onMouseLeave}
        onMouseMove={dragScroll.handlers.onMouseMove}
        onMouseUp={dragScroll.handlers.onMouseUp}
        onPointerCancel={dragScroll.handlers.onPointerCancel}
        onPointerDown={dragScroll.handlers.onPointerDown}
        onPointerMove={dragScroll.handlers.onPointerMove}
        onPointerUp={dragScroll.handlers.onPointerUp}
        onScroll={handleTableScroll}
        ref={tableScrollRef}
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[1340px] table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[125px]" />
            <col className="w-[125px]" />
            <col className="w-[180px]" />
            <col className="w-[90px]" />
            <col className="w-[115px]" />
            <col className="w-[130px]" />
            <col className="w-[105px]" />
            <col className="w-[95px]" />
            <col className="w-[150px]" />
            <col className="w-[110px]" />
            <col className="w-[120px]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Created
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Run
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Lead
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Status
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Source
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Owner
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Error type
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Attempts
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Latest attempt
              </th>
              <th className="border-r border-border/70 px-4 py-2 text-center font-semibold text-muted-foreground">
                Failure detail
              </th>
              <th className="px-3 py-2 text-center font-semibold text-muted-foreground">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr className="border-b border-border align-top" key={run.run_id}>
                <td className="border-r border-border/70 px-4 py-3 tabular-nums">
                  <p>{formatTimestamp(run.created_at)}</p>
                  <p className="text-muted-foreground">
                    Updated {formatTimestamp(run.updated_at)}
                  </p>
                </td>
                <td className="border-r border-border/70 px-4 py-3">
                  <TruncatedTableText
                    className="font-mono text-xs font-medium text-foreground"
                    value={run.run_id}
                  />
                  <TruncatedTableText
                    className="font-mono text-xs text-muted-foreground"
                    value={run.lead_id}
                  />
                </td>
                <td className="border-r border-border/70 px-4 py-3">
                  <TruncatedTableText
                    className="font-medium"
                    value={run.email ?? run.lead_id}
                  />
                  {run.lead_name ? (
                    <TruncatedTableText value={run.lead_name} />
                  ) : null}
                  {run.company_name ? (
                    <TruncatedTableText value={run.company_name} />
                  ) : null}
                  {run.company_domain ? (
                    <TruncatedTableText
                      className="text-muted-foreground"
                      value={run.company_domain}
                    />
                  ) : null}
                </td>
                <td className="border-r border-border/70 px-4 py-3 text-center">
                  <Badge tone={runStatusTone(run.run_status)}>
                    {run.run_status}
                  </Badge>
                </td>
                <td className="border-r border-border/70 px-4 py-3 text-center">
                  <TruncatedTableText value={leadSourceLabel(run.source)} />
                </td>
                <td className="border-r border-border/70 px-4 py-3 text-center">
                  <TruncatedTableText value={run.owner ?? "Unassigned"} />
                </td>
                <td className="border-r border-border/70 px-4 py-3 text-center">
                  {getRunErrorType(run) ? (
                    <Badge tone={errorTypeTone(getRunErrorType(run))}>
                      {getRunErrorType(run)}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </td>
                <td className="border-r border-border/70 px-4 py-3 text-center tabular-nums">
                  {run.attempt_count}
                </td>
                <td className="border-r border-border/70 px-4 py-3">
                  {run.latest_attempt ? (
                    <div className="min-w-0 max-w-md">
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
                <td className="border-r border-border/70 px-4 py-3 text-center">
                  <Badge
                    tone={
                      run.failure_detail_available ? "warning" : "neutral"
                    }
                  >
                    {run.failure_detail_available ? "Available" : "None"}
                  </Badge>
                </td>
                <td className="px-3 py-3 text-center align-middle">
                  <div className="flex justify-center">
                    <Button
                      aria-label={`View details for ${run.run_id}`}
                      className="h-10 min-w-[7rem] whitespace-nowrap px-4"
                      onClick={() => onSelectRun(run.run_id)}
                      variant="secondary"
                    >
                      View details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function syncHorizontalScroll(
  source: HTMLDivElement,
  target: HTMLDivElement | null
) {
  if (target && target.scrollLeft !== source.scrollLeft) {
    target.scrollLeft = source.scrollLeft;
  }
}

function useHorizontalDragScroll({
  onScrollLeftChange,
}: {
  onScrollLeftChange: (source: HTMLDivElement) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<HorizontalDragState>(
    createHorizontalDragState()
  );
  const suppressClickResetRef = useRef<number | null>(null);

  const clearSuppressClickReset = useCallback(() => {
    if (suppressClickResetRef.current !== null) {
      window.clearTimeout(suppressClickResetRef.current);
      suppressClickResetRef.current = null;
    }
  }, []);

  useEffect(() => clearSuppressClickReset, [clearSuppressClickReset]);

  const scheduleClickSuppressionReset = useCallback(() => {
    clearSuppressClickReset();
    suppressClickResetRef.current = window.setTimeout(() => {
      dragStateRef.current.suppressClick = false;
      suppressClickResetRef.current = null;
    }, 250);
  }, [clearSuppressClickReset]);

  const finishDrag = useCallback(
    (target: HTMLDivElement) => {
      const dragState = dragStateRef.current;
      const pointerId = dragState.pointerId;
      const shouldSuppressClick = dragState.hasDragStarted;

      if (
        pointerId !== null &&
        typeof target.hasPointerCapture === "function" &&
        target.hasPointerCapture(pointerId)
      ) {
        target.releasePointerCapture(pointerId);
      }

      dragStateRef.current = {
        ...createHorizontalDragState(),
        suppressClick: shouldSuppressClick,
      };
      setIsDragging(false);

      if (shouldSuppressClick) {
        scheduleClickSuppressionReset();
      }
    },
    [scheduleClickSuppressionReset]
  );

  const updateDragPosition = useCallback(
    (
      target: HTMLDivElement,
      clientX: number,
      clientY: number,
      preventDefault: () => void
    ) => {
      const dragState = dragStateRef.current;
      const deltaX = clientX - dragState.startX;
      const deltaY = clientY - dragState.startY;

      if (!dragState.hasDragStarted) {
        if (
          Math.abs(deltaX) < HORIZONTAL_DRAG_THRESHOLD_PX ||
          Math.abs(deltaX) < Math.abs(deltaY)
        ) {
          return;
        }

        dragState.hasDragStarted = true;
        dragState.suppressClick = true;
        if (
          dragState.pointerId !== null &&
          dragState.pointerId !== MOUSE_DRAG_POINTER_ID &&
          typeof target.setPointerCapture === "function"
        ) {
          try {
            target.setPointerCapture(dragState.pointerId);
          } catch {
            // Synthetic pointer events used by browser smoke checks may not
            // create an active browser pointer; dragging can continue without capture.
          }
        }
        setIsDragging(true);
      }

      preventDefault();
      target.scrollLeft = dragState.startScrollLeft - deltaX;
      onScrollLeftChange(target);
    },
    [onScrollLeftChange]
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        event.isPrimary === false ||
        event.button !== 0 ||
        event.pointerType === "touch"
      ) {
        return;
      }

      clearSuppressClickReset();
      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: event.currentTarget.scrollLeft,
        hasDragStarted: false,
        suppressClick: false,
      };
    },
    [clearSuppressClickReset]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      if (dragState.pointerId !== event.pointerId) {
        return;
      }

      updateDragPosition(event.currentTarget, event.clientX, event.clientY, () =>
        event.preventDefault()
      );
    },
    [updateDragPosition]
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId === event.pointerId) {
        finishDrag(event.currentTarget);
      }
    },
    [finishDrag]
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId === event.pointerId) {
        finishDrag(event.currentTarget);
      }
    },
    [finishDrag]
  );

  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (!dragStateRef.current.suppressClick) {
        return;
      }

      clearSuppressClickReset();
      dragStateRef.current.suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    [clearSuppressClickReset]
  );

  const handleMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (supportsPointerEvents() || event.button !== 0) {
        return;
      }

      clearSuppressClickReset();
      dragStateRef.current = {
        pointerId: MOUSE_DRAG_POINTER_ID,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: event.currentTarget.scrollLeft,
        hasDragStarted: false,
        suppressClick: false,
      };
    },
    [clearSuppressClickReset]
  );

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (
        supportsPointerEvents() ||
        dragStateRef.current.pointerId !== MOUSE_DRAG_POINTER_ID
      ) {
        return;
      }

      updateDragPosition(event.currentTarget, event.clientX, event.clientY, () =>
        event.preventDefault()
      );
    },
    [updateDragPosition]
  );

  const handleMouseEnd = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (
        !supportsPointerEvents() &&
        dragStateRef.current.pointerId === MOUSE_DRAG_POINTER_ID
      ) {
        finishDrag(event.currentTarget);
      }
    },
    [finishDrag]
  );

  return {
    isDragging,
    handlers: {
      onClickCapture: handleClickCapture,
      onLostPointerCapture: handlePointerEnd,
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseEnd,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseEnd,
      onPointerCancel: handlePointerEnd,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
}

function createHorizontalDragState(): HorizontalDragState {
  return {
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    hasDragStarted: false,
    suppressClick: false,
  };
}

function supportsPointerEvents(): boolean {
  return typeof window !== "undefined" && "PointerEvent" in window;
}

function TruncatedTableText({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  return (
    <span
      className={cn("block min-w-0 max-w-full truncate", className)}
      title={value}
    >
      {value}
    </span>
  );
}

function FilteredOutSelectionNotice({ runId }: { runId: string }) {
  return (
    <section
      className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
      role="status"
    >
      Selected run <span className="break-all font-medium">{runId}</span> is
      outside the current filtered list. The read-only detail panel remains
      available below.
    </section>
  );
}

function RunDetailPanel({ state }: { state: DetailState }) {
  if (state.status === "idle") {
    return (
      <section
        aria-label="Run detail panel"
        className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm leading-6 text-muted-foreground sm:p-5"
        data-testid="run-detail-panel"
      >
        Select a run to inspect read-only details.
      </section>
    );
  }

  if (state.status === "loading") {
    return (
      <section
        aria-label="Run detail loading state"
        className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm leading-6 text-muted-foreground sm:p-5"
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
        aria-label="Run detail error state"
        className="min-w-0 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-danger sm:p-5"
        data-testid="run-detail-panel"
        role="alert"
      >
        <h2 className="text-base font-semibold">Unable to load run detail</h2>
        <p className="mt-2 break-words">
          {state.runId}: {formatApiError(state.error)}
        </p>
      </section>
    );
  }

  const { detail } = state;

  return (
    <section
      aria-labelledby="run-detail-heading"
      className="min-w-0 rounded-lg border border-border bg-surface p-4 shadow-panel sm:p-5"
      data-testid="run-detail-panel"
    >
      <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold" id="run-detail-heading">
            Run detail
          </h2>
          <p className="break-words text-sm leading-6 text-muted-foreground">
            {detail.run_id}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Badge tone={runStatusTone(detail.run_status)}>{detail.run_status}</Badge>
          <Badge>Read-only</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="min-w-0 space-y-4">
          <DetailSection title="Lead and run">
            <KeyValueList
              entries={[
                ["Lead email", detail.email],
                ["Company", detail.company_name],
                ["Domain", detail.company_domain],
                ["Owner", detail.owner ?? "Unassigned"],
                ["Error type", detail.error_type ?? "None"],
                ["Lead ID", detail.lead_id],
                ["Source", leadSourceLabel(detail.source)],
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

        <div className="min-w-0 space-y-4">
          <DetailSection title="Attempts">
            {detail.attempts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No attempts recorded for this run.
              </p>
            ) : (
              <div className="space-y-3">
                {detail.attempts.map((attempt) => (
                  <div
                    className="min-w-0 rounded-md border border-border bg-background p-3 sm:p-4"
                    key={attempt.attempt_number}
                  >
                    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 break-words font-medium">
                        Attempt {attempt.attempt_number}
                      </p>
                      <Badge
                        className="shrink-0"
                        tone={runStatusTone(attempt.status)}
                      >
                        {attempt.status}
                      </Badge>
                    </div>
                    <p className="mt-1 break-words text-muted-foreground">
                      {formatTimestamp(attempt.created_at)}
                    </p>
                    {attempt.error_type ? (
                      <p className="mt-2 break-words">
                        Error type: {attempt.error_type}
                      </p>
                    ) : null}
                    {attempt.error_message ? (
                      <p className="mt-2 break-words text-muted-foreground">
                        Error: {attempt.error_message}
                      </p>
                    ) : null}
                    {attempt.suggested_action ? (
                      <p className="mt-2 break-words text-muted-foreground">
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
                    className="min-w-0 rounded-md border border-border bg-background p-3 sm:p-4"
                    key={`${event.event_type}-${event.created_at}`}
                  >
                    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 break-words font-medium">
                        {event.event_type}
                      </p>
                      <p className="min-w-0 break-words text-muted-foreground">
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
    <section className="min-w-0">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

function KeyValueList({ entries }: { entries: Array<[string, string]> }) {
  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-[minmax(8rem,0.4fr)_minmax(0,1fr)] sm:gap-x-3 sm:gap-y-2">
      {entries.map(([label, value]) => (
        <div className="grid min-w-0 gap-1 sm:contents" key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="min-w-0 break-words">{value}</dd>
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
    <dl className="mt-2 grid gap-3 text-sm sm:grid-cols-[minmax(8rem,0.4fr)_minmax(0,1fr)] sm:gap-x-3 sm:gap-y-2">
      {entries.map(([label, value]) => (
        <div className="grid min-w-0 gap-1 sm:contents" key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="min-w-0 break-words">{formatPayloadValue(value)}</dd>
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

function emptyRunHistoryFilters(): RunHistoryFilters {
  return {
    status: "all",
    source: "all",
    owner: "",
    errorType: "all",
    query: "",
    fromDate: "",
    toDate: "",
  };
}

function parseRunHistoryFilters(searchParams: SearchParamReader): RunHistoryFilters {
  return {
    status: normalizeStatusFilter(searchParams.get("status") ?? "all"),
    source: normalizeSourceFilter(searchParams.get("source") ?? "all"),
    owner: (searchParams.get("owner") ?? "").trim(),
    errorType: normalizeErrorTypeFilter(searchParams.get("errorType") ?? "all"),
    query: (searchParams.get("q") ?? "").trim(),
    fromDate: normalizeDateFilter(searchParams.get("from")),
    toDate: normalizeDateFilter(searchParams.get("to")),
  };
}

function parseSelectedRunId(searchParams: SearchParamReader): string | null {
  const runId = (searchParams.get("runId") ?? "").trim();
  return runId || null;
}

function normalizeStatusFilter(value: string): FilterStatus {
  return RUN_STATUS_SET.has(value) ? (value as RunStatus) : "all";
}

function normalizeSourceFilter(value: string): FilterSource {
  return LEAD_SOURCE_SET.has(value) ? (value as LeadSource) : "all";
}

function normalizeErrorTypeFilter(value: string): FilterErrorType {
  return RUN_ERROR_TYPE_SET.has(value) ? (value as ErrorType) : "all";
}

function normalizeDateFilter(value: string | null): string {
  return value && isDateOnlyValue(value) ? value : "";
}

function isDateOnlyValue(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function hasRunHistoryFilters(filters: RunHistoryFilters): boolean {
  return (
    filters.status !== "all" ||
    filters.source !== "all" ||
    filters.owner !== "" ||
    filters.errorType !== "all" ||
    filters.query !== "" ||
    filters.fromDate !== "" ||
    filters.toDate !== ""
  );
}

function buildRunHistoryQueryString(
  filters: RunHistoryFilters,
  selectedRunId: string | null
): string {
  const params = new URLSearchParams();
  if (filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.source !== "all") {
    params.set("source", filters.source);
  }
  const query = filters.query.trim();
  if (query) {
    params.set("q", query);
  }
  const owner = filters.owner.trim();
  if (owner) {
    params.set("owner", owner);
  }
  if (filters.errorType !== "all") {
    params.set("errorType", filters.errorType);
  }
  if (normalizeDateFilter(filters.fromDate)) {
    params.set("from", filters.fromDate);
  }
  if (normalizeDateFilter(filters.toDate)) {
    params.set("to", filters.toDate);
  }
  if (selectedRunId) {
    params.set("runId", selectedRunId);
  }
  return params.toString();
}

function filterRunHistory(
  runs: RunHistoryItem[],
  filters: RunHistoryFilters
): RunHistoryItem[] {
  const searchTerm = filters.query.trim().toLowerCase();

  return runs.filter((run) => {
    if (filters.status !== "all" && run.run_status !== filters.status) {
      return false;
    }
    if (filters.source !== "all" && run.source !== filters.source) {
      return false;
    }
    if (filters.owner && (run.owner ?? "") !== filters.owner) {
      return false;
    }
    if (
      filters.errorType !== "all" &&
      getRunErrorType(run) !== filters.errorType
    ) {
      return false;
    }

    const createdDate = run.created_at.slice(0, 10);
    if (filters.fromDate && createdDate < filters.fromDate) {
      return false;
    }
    if (filters.toDate && createdDate > filters.toDate) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    return searchableRunFields(run).some((value) =>
      value.toLowerCase().includes(searchTerm)
    );
  });
}

function searchableRunFields(run: RunHistoryItem): string[] {
  return [
    run.run_id,
    run.email,
    run.lead_name,
    run.company_name,
    run.company_domain,
    run.source,
    run.owner,
    getRunErrorType(run),
  ].filter((value): value is string => Boolean(value));
}

function getRunOwnerOptions(runs: RunHistoryItem[]): string[] {
  return Array.from(
    new Set(
      runs
        .map((run) => run.owner?.trim())
        .filter((owner): owner is string => Boolean(owner))
    )
  ).sort((left, right) => left.localeCompare(right));
}

function getRunSourceOptions(runs: RunHistoryItem[]): LeadSource[] {
  const availableSources = new Set(runs.map((run) => run.source));
  return leadSources.filter((source) => availableSources.has(source));
}

function getRunErrorType(run: RunHistoryItem): ErrorType | null {
  return run.error_type ?? run.latest_attempt?.error_type ?? null;
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

function errorTypeTone(errorType: ErrorType | null): "neutral" | "warning" | "danger" {
  if (errorType === "adapter") {
    return "danger";
  }
  if (errorType === "validation") {
    return "warning";
  }
  return "neutral";
}
