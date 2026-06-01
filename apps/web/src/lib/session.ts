import type { DuplicateHint, LeadIntakeRequest, SubmissionRecord } from "./types";

export const emptyDuplicateHint: DuplicateHint = {
  status: "none",
  message: "No same-session duplicate found.",
};

export function findSameSessionDuplicate(
  submissions: SubmissionRecord[],
  payload: LeadIntakeRequest
): DuplicateHint {
  const email = normalizeEmail(payload.email);
  const domain = normalizeDomain(payload.company_domain);

  const emailMatch = submissions.find(
    (submission) => normalizeEmail(submission.payload.email) === email
  );
  if (emailMatch) {
    return {
      status: "same_session_email",
      message: "Same-session email match found.",
      matchedSubmissionId: emailMatch.id,
    };
  }

  const domainMatch = submissions.find(
    (submission) => normalizeDomain(submission.payload.company_domain) === domain
  );
  if (domainMatch) {
    return {
      status: "same_session_domain",
      message: "Same-session company domain match found.",
      matchedSubmissionId: domainMatch.id,
    };
  }

  return emptyDuplicateHint;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeDomain(value: string): string {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith("www.") ? normalized.slice(4) : normalized;
}
