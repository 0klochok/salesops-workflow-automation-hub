import { Suspense } from "react";

import { AdminRunHistory } from "@/components/admin-run-history";

export default function AdminRunsPage() {
  return (
    <Suspense fallback={null}>
      <AdminRunHistory />
    </Suspense>
  );
}
