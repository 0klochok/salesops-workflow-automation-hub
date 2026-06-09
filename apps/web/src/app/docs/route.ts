import { NextResponse } from "next/server";

const DEFAULT_BACKEND_API_BASE_URL = "http://127.0.0.1:8000";

export const dynamic = "force-dynamic";

function resolveBackendApiBaseUrl(): string {
  return (
    process.env.BACKEND_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
    DEFAULT_BACKEND_API_BASE_URL
  );
}

export function GET(): Response {
  const docsUrl = new URL("/docs", resolveBackendApiBaseUrl());

  return NextResponse.redirect(docsUrl, { status: 307 });
}
