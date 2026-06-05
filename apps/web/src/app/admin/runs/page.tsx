import { Suspense } from "react";

import { AdminRunHistory } from "@/components/admin-run-history";

export default function AdminRunsPage() {
  return (
    <Suspense fallback={<AdminRunsFallback />}>
      <AdminRunHistory />
    </Suspense>
  );
}

function AdminRunsFallback() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex min-w-0 flex-col gap-3 border-b border-border pb-5">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="min-w-0 text-2xl font-semibold tracking-normal text-foreground">
                Admin run history
              </h1>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Loading persisted automation runs from the local backend.
          </p>
        </header>
        <section
          className="min-w-0 rounded-lg border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
          role="status"
        >
          Loading admin run history...
        </section>
      </div>
    </main>
  );
}
