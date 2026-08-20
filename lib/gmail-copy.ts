import type { ProspectProfile } from "@/types/prospect";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "");
}

export function fromAddress(prospect: ProspectProfile): string {
  const firstName = prospect.contactName.trim().split(/\s+/)[0] || "team";
  const domain = slugify(prospect.companyName) || "company";
  return `${slugify(firstName)}@${domain}.com`;
}

export function fromDisplayName(prospect: ProspectProfile): string {
  const firstName = prospect.contactName.trim().split(/\s+/)[0] || "Team";
  return `${firstName} at ${prospect.companyName || "the company"}`;
}

export function subjectLine(prospect: ProspectProfile): string {
  return `Your \u{1F4B3} payment for ${prospect.companyName || "your account"} failed`;
}

export function termOptimizationSubjectLine(prospect: ProspectProfile): string {
  return `Save money on your ${prospect.companyName || "your"} subscription`;
}
