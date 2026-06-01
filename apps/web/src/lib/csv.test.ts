import { describe, expect, it } from "vitest";

import { parseLeadCsv } from "./csv";

describe("parseLeadCsv", () => {
  it("maps a valid CSV row to the backend intake request shape", () => {
    const result = parseLeadCsv(
      [
        "email,first_name,last_name,company_name,company_domain,lead_score,job_title",
        "Ada@Example.com,Ada,Lovelace,Example Co,www.example.com,91,CTO",
      ].join("\n")
    );

    expect(result.errors).toEqual([]);
    expect(result.leads).toEqual([
      {
        email: "ada@example.com",
        first_name: "Ada",
        last_name: "Lovelace",
        company_name: "Example Co",
        company_domain: "example.com",
        source: "csv_upload",
        job_title: "CTO",
        phone: undefined,
        message: undefined,
        lead_score: 91,
      },
    ]);
  });

  it("reports missing and invalid row fields without creating a lead", () => {
    const result = parseLeadCsv(
      [
        "email,first_name,last_name,company_name,company_domain,lead_score",
        "not-an-email,Ada,,Example Co,https://example.com,101",
      ].join("\n")
    );

    expect(result.leads).toEqual([]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.message).toContain("last_name is required");
    expect(result.errors[0]?.message).toContain("email must be valid");
    expect(result.errors[0]?.message).toContain("company_domain must be a domain");
    expect(result.errors[0]?.message).toContain("lead_score must be an integer");
  });
});
