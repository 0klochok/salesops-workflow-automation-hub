import type {
  ApiErrorResponse,
  ApiResult,
  LeadIntakeRequest,
  LeadIntakeResponse,
} from "./types";

export async function submitLeadIntake(
  payload: LeadIntakeRequest
): Promise<ApiResult> {
  const response = await fetch("/api/leads/intake", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
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
    data: body as LeadIntakeResponse,
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
