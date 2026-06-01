import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LeadDemo } from "./lead-demo";

const successResponse = {
  lead_id: "lead_abc123",
  run_id: "run_abc123",
  run_status: "success",
  dedupe: {
    status: "unique",
    is_duplicate: false,
    matched_lead_id: null,
    matched_fields: [],
  },
  crm: {
    adapter: "mock_crm",
    action: "created",
    contact_id: "mock_contact_abc123",
    deal_id: "mock_deal_abc123",
  },
  slack: null,
};

describe("LeadDemo", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders schema-aligned fields and submits the expected JSON payload", async () => {
    const fetchMock = mockFetch(successResponse, 201);

    render(<LeadDemo />);
    await fillLeadForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string)).toEqual({
      email: "ada@example.com",
      first_name: "Ada",
      last_name: "Lovelace",
      company_name: "Example Co",
      company_domain: "example.com",
      source: "demo_form",
      lead_score: 80,
    });
    expect(await screen.findByText("run_abc123")).toBeInTheDocument();
  });

  it("displays FastAPI-style 422 validation details", async () => {
    mockFetch(
      {
        detail: [
          {
            loc: ["body", "email"],
            msg: "email must be a valid local email address",
            type: "value_error",
          },
        ],
      },
      422
    );

    render(<LeadDemo />);
    await fillLeadForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));

    expect((await screen.findAllByText("Validation failed")).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/body.email: email must be a valid local email address/)
        .length
    ).toBeGreaterThan(0);
  });

  it("imports local CSV rows through the same intake contract", async () => {
    const fetchMock = mockFetch(successResponse, 201);

    render(<LeadDemo />);
    await userEvent.clear(screen.getByLabelText("CSV input"));
    await userEvent.type(
      screen.getByLabelText("CSV input"),
      [
        "email,first_name,last_name,company_name,company_domain,lead_score",
        "grace@example.com,Grace,Hopper,Example Co,example.com,89",
      ].join("\n")
    );
    await userEvent.click(screen.getByRole("button", { name: "Import rows" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string)).toMatchObject({
      email: "grace@example.com",
      source: "csv_upload",
      lead_score: 89,
    });
    expect(screen.getByTestId("csv-summary")).toHaveTextContent(
      "1 of 1 rows submitted locally."
    );
  });

  it("shows same-session duplicate hints without changing backend behavior", async () => {
    mockFetch(successResponse, 201);

    render(<LeadDemo />);
    await fillLeadForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));
    await screen.findByText("run_abc123");
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));

    expect(
      (await screen.findAllByText("Same-session email match found.")).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("unique").length).toBeGreaterThan(0);
  });

  it("filters dashboard rows by source", async () => {
    mockFetch(successResponse, 201);

    render(<LeadDemo />);
    await fillLeadForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));
    await screen.findByText("run_abc123");

    await userEvent.clear(screen.getByLabelText(/Email/));
    await userEvent.type(screen.getByLabelText(/Email/), "manual@example.com");
    await userEvent.selectOptions(screen.getByLabelText(/Source/), "manual");
    await userEvent.click(screen.getByRole("button", { name: "Submit lead" }));

    await userEvent.selectOptions(screen.getByLabelText("Filter by source"), "manual");
    const table = within(screen.getByTestId("submission-table"));
    expect(table.getByText("manual@example.com")).toBeInTheDocument();
    expect(table.queryByText("ada@example.com")).not.toBeInTheDocument();
  });
});

async function fillLeadForm() {
  await userEvent.type(screen.getByLabelText(/Email/), "ada@example.com");
  await userEvent.type(screen.getByLabelText(/Company domain/), "example.com");
  await userEvent.type(screen.getByLabelText(/First name/), "Ada");
  await userEvent.type(screen.getByLabelText(/Last name/), "Lovelace");
  await userEvent.type(screen.getByLabelText(/Company name/), "Example Co");
}

function mockFetch(body: unknown, status: number) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: () => "application/json",
    },
    json: async () => body,
    text: async () => JSON.stringify(body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
