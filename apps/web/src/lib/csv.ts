import { leadSources, type LeadIntakeRequest, type LeadSource } from "./types";

const requiredHeaders = [
  "email",
  "first_name",
  "last_name",
  "company_name",
  "company_domain",
] as const;

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const domainPattern = /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;

export type CsvParseError = {
  rowNumber: number;
  message: string;
};

export type CsvParseResult = {
  leads: LeadIntakeRequest[];
  errors: CsvParseError[];
  totalRows: number;
};

export function parseLeadCsv(csvText: string): CsvParseResult {
  const parsed = parseCsvRows(csvText);
  if (parsed.rows.length === 0) {
    return {
      leads: [],
      errors: [{ rowNumber: 1, message: "CSV is empty." }],
      totalRows: 0,
    };
  }

  const [rawHeaders, ...dataRows] = parsed.rows;
  const headers = rawHeaders.map(normalizeHeader);
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
  const headerErrors = missingHeaders.map((header) => ({
    rowNumber: 1,
    message: `Missing required header: ${header}.`,
  }));

  if (headerErrors.length > 0) {
    return {
      leads: [],
      errors: [...parsed.errors, ...headerErrors],
      totalRows: dataRows.length,
    };
  }

  const leads: LeadIntakeRequest[] = [];
  const errors: CsvParseError[] = [...parsed.errors];

  dataRows.forEach((row, rowIndex) => {
    if (row.every((cell) => cell.trim() === "")) {
      return;
    }

    const rowNumber = rowIndex + 2;
    const values = buildRowValues(headers, row);
    const rowErrors = validateRow(values);

    if (rowErrors.length > 0) {
      errors.push({
        rowNumber,
        message: rowErrors.join(" "),
      });
      return;
    }

    leads.push({
      email: values.email.trim().toLowerCase(),
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      company_name: values.company_name.trim(),
      company_domain: normalizeDomain(values.company_domain),
      source: parseSource(values.source),
      job_title: optionalText(values.job_title),
      phone: optionalText(values.phone),
      message: optionalText(values.message),
      lead_score: parseLeadScore(values.lead_score),
    });
  });

  return {
    leads,
    errors,
    totalRows: dataRows.filter((row) => row.some((cell) => cell.trim() !== "")).length,
  };
}

function parseCsvRows(csvText: string): { rows: string[][]; errors: CsvParseError[] } {
  const rows: string[][] = [];
  const errors: CsvParseError[] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += character;
  }

  if (inQuotes) {
    errors.push({
      rowNumber: rows.length + 1,
      message: "CSV contains an unclosed quoted field.",
    });
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "") || rows.length === 0) {
    rows.push(row);
  }

  return { rows, errors };
}

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function buildRowValues(headers: string[], row: string[]): Record<string, string> {
  return headers.reduce<Record<string, string>>((values, header, index) => {
    values[header] = row[index] ?? "";
    return values;
  }, {});
}

function validateRow(values: Record<string, string>): string[] {
  const errors: string[] = [];
  for (const header of requiredHeaders) {
    if (!values[header]?.trim()) {
      errors.push(`${header} is required.`);
    }
  }

  const email = values.email?.trim().toLowerCase() ?? "";
  if (email && !emailPattern.test(email)) {
    errors.push("email must be valid.");
  }

  const companyDomain = values.company_domain?.trim().toLowerCase() ?? "";
  if (companyDomain) {
    const normalizedDomain = normalizeDomain(companyDomain);
    if (
      normalizedDomain.includes("://") ||
      normalizedDomain.includes("/") ||
      normalizedDomain.includes("@") ||
      !domainPattern.test(normalizedDomain)
    ) {
      errors.push("company_domain must be a domain.");
    }
  }

  const source = values.source?.trim();
  if (source && !isLeadSource(source)) {
    errors.push("source must be demo_form, csv_upload, or manual.");
  }

  const score = values.lead_score?.trim();
  if (score && !isValidLeadScore(score)) {
    errors.push("lead_score must be an integer from 0 to 100.");
  }

  return errors;
}

function parseSource(source: string | undefined): LeadSource {
  if (source && isLeadSource(source.trim())) {
    return source.trim() as LeadSource;
  }
  return "csv_upload";
}

function isLeadSource(source: string): boolean {
  return leadSources.includes(source as LeadSource);
}

function parseLeadScore(score: string | undefined): number {
  if (!score?.trim()) {
    return 0;
  }
  return Number.parseInt(score.trim(), 10);
}

function isValidLeadScore(score: string): boolean {
  const parsed = Number(score);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 100;
}

function optionalText(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeDomain(value: string): string {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith("www.") ? normalized.slice(4) : normalized;
}
