import { describe, expect, it } from "vitest";

import { findSameSessionDuplicate } from "./session";
import type { SubmissionRecord } from "./types";

const existingSubmission: SubmissionRecord = {
  id: "submission-1",
  submittedAt: "2026-06-01T09:00:00.000Z",
  origin: "form",
  payload: {
    email: "ada@example.com",
    first_name: "Ada",
    last_name: "Lovelace",
    company_name: "Example Co",
    company_domain: "example.com",
    source: "demo_form",
    lead_score: 80,
  },
  statusCode: 201,
  status: "success",
  duplicateHint: {
    status: "none",
    message: "No same-session duplicate found.",
  },
};

describe("findSameSessionDuplicate", () => {
  it("prioritizes same-session email matches", () => {
    const result = findSameSessionDuplicate([existingSubmission], {
      ...existingSubmission.payload,
      email: "ADA@example.com",
      company_domain: "other.example.com",
    });

    expect(result.status).toBe("same_session_email");
    expect(result.matchedSubmissionId).toBe("submission-1");
  });

  it("flags same-session company domain matches when email is new", () => {
    const result = findSameSessionDuplicate([existingSubmission], {
      ...existingSubmission.payload,
      email: "grace@example.com",
      company_domain: "www.example.com",
    });

    expect(result.status).toBe("same_session_domain");
  });
});
