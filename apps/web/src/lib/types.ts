export const leadSources = ["demo_form", "csv_upload", "manual"] as const;

export type LeadSource = (typeof leadSources)[number];

export type LeadIntakeRequest = {
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  company_domain: string;
  source: LeadSource;
  job_title?: string;
  phone?: string;
  message?: string;
  lead_score: number;
};

export type DedupeStatus =
  | "unique"
  | "duplicate_email"
  | "possible_duplicate_domain";

export type LeadIntakeResponse = {
  lead_id: string;
  run_id: string;
  run_status: "queued" | "success" | "failed" | "retried";
  dedupe: {
    status: DedupeStatus;
    is_duplicate: boolean;
    matched_lead_id: string | null;
    matched_fields: string[];
  };
  crm: {
    adapter: string;
    action: "created" | "updated";
    contact_id: string;
    deal_id: string;
  };
  slack: {
    adapter: string;
    notification_id: string;
    channel: string;
    message_preview: string;
    delivered: boolean;
  } | null;
};

export type ApiErrorDetail = {
  type?: string;
  loc?: Array<string | number>;
  msg?: string;
};

export type ApiErrorResponse = {
  detail?: ApiErrorDetail[] | string;
  suggested_action?: string;
};

export type ApiResult =
  | {
      ok: true;
      status: number;
      data: LeadIntakeResponse;
    }
  | {
      ok: false;
      status: number;
      error: ApiErrorResponse;
    };

export type SubmissionStatus = "success" | "validation_error" | "error";

export type DuplicateHintStatus =
  | "none"
  | "same_session_email"
  | "same_session_domain";

export type DuplicateHint = {
  status: DuplicateHintStatus;
  message: string;
  matchedSubmissionId?: string;
};

export type SubmissionRecord = {
  id: string;
  submittedAt: string;
  origin: "form" | "csv";
  payload: LeadIntakeRequest;
  statusCode: number | null;
  status: SubmissionStatus;
  duplicateHint: DuplicateHint;
  response?: LeadIntakeResponse;
  error?: ApiErrorResponse;
};
