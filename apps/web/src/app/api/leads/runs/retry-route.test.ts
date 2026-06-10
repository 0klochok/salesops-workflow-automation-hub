import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./[runId]/retry/route";

const ORIGINAL_BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;
const ORIGINAL_NEXT_PUBLIC_BACKEND_API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

describe("retry run proxy route", () => {
  beforeEach(() => {
    process.env.BACKEND_API_BASE_URL = "http://127.0.0.1:8123";
    delete process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    restoreEnvValue("BACKEND_API_BASE_URL", ORIGINAL_BACKEND_API_BASE_URL);
    restoreEnvValue(
      "NEXT_PUBLIC_BACKEND_API_BASE_URL",
      ORIGINAL_NEXT_PUBLIC_BACKEND_API_BASE_URL
    );
    vi.restoreAllMocks();
  });

  it("posts to the backend retry endpoint and preserves a successful response", async () => {
    const body = {
      run_id: "run_demo_failed",
      lead_id: "lead_demo_failed",
      run_status: "retried",
      attempt_count: 3,
      latest_attempt_number: 3,
      latest_attempt_status: "retried",
    };
    const fetchMock = mockBackendResponse(body, 200, "application/json");

    const response = await callPost("run_demo_failed");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/json");
    expect(await response.json()).toEqual(body);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "http://127.0.0.1:8123/leads/runs/run_demo_failed/retry"
    );
    expect(init).toEqual({
      method: "POST",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
  });

  it.each([
    [403, { detail: "CRM_PROVIDER must be mock for manual retry." }],
    [404, { detail: "Automation run not found" }],
    [409, { detail: "Only failed or queued automation runs can be retried" }],
  ])(
    "preserves backend %i retry errors without rewriting the response body",
    async (status, body) => {
      mockBackendResponse(body, status, "application/json; charset=utf-8");

      const response = await callPost("run_demo_failed");

      expect(response.status).toBe(status);
      expect(response.headers.get("content-type")).toBe(
        "application/json; charset=utf-8"
      );
      expect(await response.json()).toEqual(body);
    }
  );

  it("returns a safe backend-unreachable response when the backend request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("connection refused"))
    );

    const response = await callPost("run_demo_failed");

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      detail: [
        {
          type: "backend_unreachable",
          loc: ["proxy", "backend"],
          msg: "Unable to reach local backend at http://127.0.0.1:8123.",
        },
      ],
      suggested_action:
        "Start the FastAPI backend with uv run uvicorn backend.app.main:app --reload.",
    });
  });
});

function mockBackendResponse(
  body: unknown,
  status: number,
  contentType: string
) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "content-type": contentType,
      },
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function callPost(runId: string): Promise<Response> {
  return POST(new Request("http://localhost/api/leads/runs/retry"), {
    params: Promise.resolve({ runId }),
  });
}

function restoreEnvValue(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
    return;
  }

  process.env[name] = value;
}
