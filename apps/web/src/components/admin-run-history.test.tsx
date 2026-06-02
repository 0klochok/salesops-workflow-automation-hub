import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AdminRunHistory } from "./admin-run-history";

const runHistoryResponse = {
  runs: [
    {
      run_id: "run_demo_failed",
      lead_id: "lead_demo_failed",
      email: "failed.demo@example.com",
      company_name: "Pipeline Labs",
      company_domain: "pipelinelabs.example",
      source: "demo_form",
      run_status: "failed",
      created_at: "2026-06-01T10:00:00Z",
      updated_at: "2026-06-01T10:01:00Z",
      attempt_count: 2,
      latest_attempt: {
        attempt_number: 2,
        status: "failed",
        error_type: "adapter",
        summary: "Mock CRM adapter failed token=[redacted]",
        created_at: "2026-06-01T10:01:00Z",
      },
      failure_detail_available: true,
    },
    {
      run_id: "run_demo_success",
      lead_id: "lead_demo_success",
      email: "success.demo@example.com",
      company_name: "Northstar Growth",
      company_domain: "northstar.example",
      source: "csv_upload",
      run_status: "success",
      created_at: "2026-06-01T09:00:00Z",
      updated_at: "2026-06-01T09:01:00Z",
      attempt_count: 2,
      latest_attempt: {
        attempt_number: 2,
        status: "success",
        error_type: null,
        summary: "Run completed successfully.",
        created_at: "2026-06-01T09:01:00Z",
      },
      failure_detail_available: false,
    },
  ],
};

const runDetailResponse = {
  run_id: "run_demo_failed",
  lead_id: "lead_demo_failed",
  email: "failed.demo@example.com",
  company_name: "Pipeline Labs",
  company_domain: "pipelinelabs.example",
  source: "demo_form",
  run_status: "failed",
  created_at: "2026-06-01T10:00:00Z",
  updated_at: "2026-06-01T10:01:00Z",
  attempts: [
    {
      attempt_number: 1,
      status: "queued",
      error_type: null,
      error_message: null,
      suggested_action: null,
      created_at: "2026-06-01T10:00:00Z",
    },
    {
      attempt_number: 2,
      status: "failed",
      error_type: "adapter",
      error_message: "Mock CRM adapter failed token=[redacted]",
      suggested_action: "Review the synthetic CRM payload and retry locally.",
      created_at: "2026-06-01T10:01:00Z",
    },
  ],
  failure_detail_available: true,
  intake_payload: {
    email: "failed.demo@example.com",
    first_name: "Marcus",
    last_name: "Rivera",
    company_name: "Pipeline Labs",
    company_domain: "pipelinelabs.example",
    source: "demo_form",
    job_title: "Revenue Operations Lead",
    lead_score: 84,
  },
  audit_events: [
    {
      event_type: "dedupe",
      payload: {
        status: "unique",
        is_duplicate: false,
        matched_fields: [],
      },
      created_at: "2026-06-01T10:00:00Z",
    },
    {
      event_type: "crm_upsert",
      payload: {
        adapter: "mock_crm",
        action: "created",
        contact_id: "mock_contact_lead_demo_failed",
        deal_id: "mock_deal_lead_demo_failed",
      },
      created_at: "2026-06-01T10:01:00Z",
    },
    {
      event_type: "slack_notification",
      payload: {
        adapter: "mock_slack",
        notification_id: "mock_notification_run_demo_failed",
        channel: "#mock-salesops-alerts",
        message_preview: "Qualified lead: failed.demo@example.com",
        delivered: true,
      },
      created_at: "2026-06-01T10:01:00Z",
    },
    {
      event_type: "manual_retry",
      payload: {
        run_id: "run_demo_failed",
        lead_id: "lead_demo_failed",
        status: "retried",
        attempt_number: 3,
        attempt_status: "retried",
        suggested_action: "Retry locally after checking token=[redacted].",
      },
      created_at: "2026-06-01T10:02:00Z",
    },
  ],
};

describe("AdminRunHistory", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders persisted run rows from the run-history response", async () => {
    const fetchMock = mockFetch(runHistoryResponse, 200);

    render(<AdminRunHistory />);

    expect(await screen.findByText("run_demo_failed")).toBeInTheDocument();
    expect(screen.getByText("lead_demo_failed")).toBeInTheDocument();
    expect(screen.getByText("failed.demo@example.com")).toBeInTheDocument();
    expect(screen.getByText("Pipeline Labs")).toBeInTheDocument();
    expect(screen.getByText("pipelinelabs.example")).toBeInTheDocument();
    expect(screen.getByText("demo_form")).toBeInTheDocument();
    expect(screen.getByText("Attempt 2: failed")).toBeInTheDocument();
    expect(screen.getByText("Error type: adapter")).toBeInTheDocument();
    expect(
      screen.getByText("Mock CRM adapter failed token=[redacted]")
    ).toBeInTheDocument();
    expect(screen.getByText("run_demo_success")).toBeInTheDocument();
    expect(screen.getByText("success.demo@example.com")).toBeInTheDocument();
    expect(screen.getByText("Northstar Growth")).toBeInTheDocument();
    expect(screen.getByText("csv_upload")).toBeInTheDocument();
    expect(
      screen.getByText("Select a run to inspect read-only details.")
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/leads/runs", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
  });

  it("renders an empty state when no persisted runs exist", async () => {
    mockFetch({ runs: [] }, 200);

    render(<AdminRunHistory />);

    expect(
      await screen.findByText("No persisted automation runs yet.")
    ).toBeInTheDocument();
  });

  it("keeps older run-history rows readable when enriched identity is absent", async () => {
    mockFetch(
      {
        runs: [
          {
            run_id: "run_legacy",
            lead_id: "lead_legacy",
            source: "manual",
            run_status: "queued",
            created_at: "2026-06-01T11:00:00Z",
            updated_at: "2026-06-01T11:00:00Z",
            attempt_count: 1,
            latest_attempt: null,
            failure_detail_available: false,
          },
        ],
      },
      200
    );

    render(<AdminRunHistory />);

    expect(await screen.findByText("run_legacy")).toBeInTheDocument();
    expect(screen.getAllByText("lead_legacy")).toHaveLength(2);
    expect(screen.getByText("manual")).toBeInTheDocument();
  });

  it("loads and renders selected run details from the read-only detail endpoint", async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetchByUrl({
      "/api/leads/runs": { body: runHistoryResponse, status: 200 },
      "/api/leads/runs/run_demo_failed": {
        body: runDetailResponse,
        status: 200,
      },
    });

    render(<AdminRunHistory />);

    await screen.findByText("run_demo_failed");
    await user.click(
      screen.getByRole("button", { name: /view details for run_demo_failed/i })
    );

    await screen.findByText("Run detail");
    const panel = screen.getByTestId("run-detail-panel");
    expect(within(panel).getByText("Run detail")).toBeInTheDocument();
    expect(within(panel).getAllByText("failed.demo@example.com")).toHaveLength(2);
    expect(within(panel).getAllByText("Pipeline Labs")).toHaveLength(2);
    expect(within(panel).getAllByText("pipelinelabs.example")).toHaveLength(2);
    expect(within(panel).getByText("Attempt 1")).toBeInTheDocument();
    expect(within(panel).getByText("Attempt 2")).toBeInTheDocument();
    expect(within(panel).getByText("Error type: adapter")).toBeInTheDocument();
    expect(
      within(panel).getByText("Error: Mock CRM adapter failed token=[redacted]")
    ).toBeInTheDocument();
    expect(within(panel).getByText("crm_upsert")).toBeInTheDocument();
    expect(within(panel).getByText("mock_crm")).toBeInTheDocument();
    expect(within(panel).getByText("slack_notification")).toBeInTheDocument();
    expect(within(panel).getByText("mock_slack")).toBeInTheDocument();
    expect(within(panel).getByText("manual_retry")).toBeInTheDocument();
    expect(panel).not.toHaveTextContent("phone");
    expect(panel).not.toHaveTextContent("plain-text-secret");
    expect(fetchMock).toHaveBeenCalledWith("/api/leads/runs/run_demo_failed", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    expect(fetchMock.mock.calls.every((call) => call[1]?.method === "GET")).toBe(
      true
    );
  });

  it("renders a loading state while selected run detail is pending", async () => {
    const user = userEvent.setup();
    let resolveDetail: (response: ReturnType<typeof mockJsonResponse>) => void =
      () => undefined;
    const detailRequest = new Promise<ReturnType<typeof mockJsonResponse>>(
      (resolve) => {
        resolveDetail = resolve;
      }
    );
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        void init;
        const url = urlFromFetchInput(input);
        if (url === "/api/leads/runs") {
          return Promise.resolve(mockJsonResponse(runHistoryResponse, 200));
        }
        if (url === "/api/leads/runs/run_demo_failed") {
          return detailRequest;
        }
        return Promise.resolve(mockJsonResponse({ detail: "Unexpected URL" }, 500));
      })
    );

    render(<AdminRunHistory />);

    await screen.findByText("run_demo_failed");
    await user.click(
      screen.getByRole("button", { name: /view details for run_demo_failed/i })
    );

    expect(
      screen.getByText("Loading run details for run_demo_failed...")
    ).toBeInTheDocument();
    resolveDetail(mockJsonResponse(runDetailResponse, 200));
    expect(await screen.findByText("Run detail")).toBeInTheDocument();
  });

  it("renders an error state when selected run detail fails", async () => {
    const user = userEvent.setup();
    mockFetchByUrl({
      "/api/leads/runs": { body: runHistoryResponse, status: 200 },
      "/api/leads/runs/run_demo_failed": {
        body: { detail: "Automation run not found" },
        status: 404,
      },
    });

    render(<AdminRunHistory />);

    await screen.findByText("run_demo_failed");
    await user.click(
      screen.getByRole("button", { name: /view details for run_demo_failed/i })
    );

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("run_demo_failed");
    expect(alert).toHaveTextContent("Automation run not found");
  });

  it("renders an error state when the run-history request fails", async () => {
    mockFetch(
      {
        detail: [
          {
            type: "backend_unreachable",
            loc: ["proxy", "backend"],
            msg: "Unable to reach local backend at http://127.0.0.1:8000.",
          },
        ],
        suggested_action:
          "Start the FastAPI backend with uv run uvicorn backend.app.main:app --reload.",
      },
      502
    );

    render(<AdminRunHistory />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Unable to load run history");
    expect(alert).toHaveTextContent(
      "proxy.backend: Unable to reach local backend at http://127.0.0.1:8000."
    );
    expect(alert).toHaveTextContent("Suggested action: Start the FastAPI backend");
  });

  it("does not show retry controls or issue mutation requests", async () => {
    const fetchMock = mockFetch(runHistoryResponse, 200);

    render(<AdminRunHistory />);

    await screen.findByText("run_demo_failed");
    expect(screen.queryByRole("button", { name: /retry/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/^Retry$/i)).not.toBeInTheDocument();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const table = within(screen.getByTestId("run-history-table"));
    expect(table.queryByText(/^Retry$/i)).not.toBeInTheDocument();
    expect(fetchMock.mock.calls.every((call) => call[1]?.method === "GET")).toBe(
      true
    );
  });
});

function mockFetch(body: unknown, status: number) {
  const fetchMock = vi.fn().mockResolvedValue(mockJsonResponse(body, status));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function mockFetchByUrl(
  routes: Record<string, { body: unknown; status: number }>
) {
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    void init;
    const url = urlFromFetchInput(input);
    const route = routes[url];
    if (!route) {
      return Promise.resolve(mockJsonResponse({ detail: "Unexpected URL" }, 500));
    }
    return Promise.resolve(mockJsonResponse(route.body, route.status));
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function mockJsonResponse(body: unknown, status: number) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: () => "application/json",
    },
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function urlFromFetchInput(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
}
