import { NextResponse } from "next/server";

const DEFAULT_BACKEND_API_BASE_URL = "http://127.0.0.1:8000";

function resolveBackendApiBaseUrl(): string {
  return (
    process.env.BACKEND_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
    DEFAULT_BACKEND_API_BASE_URL
  );
}

export async function GET(): Promise<Response> {
  const backendApiBaseUrl = resolveBackendApiBaseUrl();
  const runsUrl = new URL("/leads/runs", backendApiBaseUrl);

  try {
    const backendResponse = await fetch(runsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    const responseText = await backendResponse.text();

    return new Response(responseText, {
      status: backendResponse.status,
      headers: {
        "content-type":
          backendResponse.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      {
        detail: [
          {
            type: "backend_unreachable",
            loc: ["proxy", "backend"],
            msg: `Unable to reach local backend at ${backendApiBaseUrl}.`,
          },
        ],
        suggested_action:
          "Start the FastAPI backend with uv run uvicorn backend.app.main:app --reload.",
      },
      { status: 502 }
    );
  }
}
