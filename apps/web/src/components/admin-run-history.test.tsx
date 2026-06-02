import { render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AdminRunHistory } from "./admin-run-history";

const runHistoryResponse = {
  runs: [
    {
      run_id: "run_demo_failed",
      lead_id: "lead_demo_failed",
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
    expect(screen.getByText("demo_form")).toBeInTheDocument();
    expect(screen.getByText("Attempt 2: failed")).toBeInTheDocument();
    expect(screen.getByText("Error type: adapter")).toBeInTheDocument();
    expect(
      screen.getByText("Mock CRM adapter failed token=[redacted]")
    ).toBeInTheDocument();
    expect(screen.getByText("run_demo_success")).toBeInTheDocument();
    expect(screen.getByText("csv_upload")).toBeInTheDocument();
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
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: () => "application/json",
    },
    json: async () => body,
    text: async () => JSON.stringify(body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
