import { NextResponse } from "next/server";

const DEFAULT_BACKEND_API_BASE_URL = "http://127.0.0.1:8000";

function resolveBackendApiBaseUrl(): string {
  return (
    process.env.BACKEND_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
    DEFAULT_BACKEND_API_BASE_URL
  );
}

export async function POST(request: Request): Promise<Response> {
  const backendApiBaseUrl = resolveBackendApiBaseUrl();
  const intakeUrl = new URL("/leads/intake", backendApiBaseUrl);

  try {
    const body = await request.text();
    const backendResponse = await fetch(intakeUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
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
