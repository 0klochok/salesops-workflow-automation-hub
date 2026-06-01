import type { ApiErrorResponse, SubmissionRecord } from "./types";

export function formatApiError(error: ApiErrorResponse | undefined): string {
  if (!error) {
    return "Unknown local error.";
  }

  if (typeof error.detail === "string") {
    return appendSuggestedAction(error.detail, error.suggested_action);
  }

  if (Array.isArray(error.detail)) {
    const detail = error.detail
      .map((item) => {
        const location = item.loc?.join(".");
        const message = item.msg ?? item.type ?? "Invalid value.";
        return location ? `${location}: ${message}` : message;
      })
      .join(" ");
    return appendSuggestedAction(detail, error.suggested_action);
  }

  return appendSuggestedAction("Unexpected local API error.", error.suggested_action);
}

export function statusLabel(record: SubmissionRecord): string {
  if (record.status === "success") {
    return "Success";
  }
  if (record.status === "validation_error") {
    return "Validation failed";
  }
  return "Error";
}

function appendSuggestedAction(message: string, suggestedAction: string | undefined): string {
  if (!suggestedAction) {
    return message;
  }
  return `${message} Suggested action: ${suggestedAction}`;
}
