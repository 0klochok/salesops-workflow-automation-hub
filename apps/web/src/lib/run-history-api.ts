import type {
  ApiErrorResponse,
  RetryRunResponse,
  RunDetailResponse,
  RunHistoryResponse,
} from "./types";

export type RunHistoryApiResult =
  | {
      ok: true;
      status: number;
      data: RunHistoryResponse;
    }
  | {
      ok: false;
      status: number;
      error: ApiErrorResponse;
    };

export type RunDetailApiResult =
  | {
      ok: true;
      status: number;
      data: RunDetailResponse;
    }
  | {
      ok: false;
      status: number;
      error: ApiErrorResponse;
    };

export type RetryRunApiResult =
  | {
      ok: true;
      status: number;
      data: RetryRunResponse;
    }
  | {
      ok: false;
      status: number;
      error: ApiErrorResponse;
    };

export async function fetchRunHistory(): Promise<RunHistoryApiResult> {
  const response = await fetch("/api/leads/runs", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    cache: "no-store",
  });
  const body = await parseJsonBody(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: normalizeErrorBody(body),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: body as RunHistoryResponse,
  };
}

export async function fetchRunDetail(runId: string): Promise<RunDetailApiResult> {
  const response = await fetch(`/api/leads/runs/${encodeURIComponent(runId)}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    cache: "no-store",
  });
  const body = await parseJsonBody(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: normalizeErrorBody(body),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: body as RunDetailResponse,
  };
}

export async function retryRun(runId: string): Promise<RetryRunApiResult> {
  const response = await fetch(
    `/api/leads/runs/${encodeURIComponent(runId)}/retry`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    }
  );
  const body = await parseJsonBody(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: normalizeErrorBody(body),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: body as RetryRunResponse,
  };
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return { detail: await response.text() };
  }
  return response.json();
}

function normalizeErrorBody(body: unknown): ApiErrorResponse {
  if (typeof body === "object" && body !== null) {
    return body as ApiErrorResponse;
  }
  if (typeof body === "string") {
    return { detail: body };
  }
  return { detail: "Unexpected local API error." };
}
