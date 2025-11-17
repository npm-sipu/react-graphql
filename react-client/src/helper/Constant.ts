import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export function formatToISOString(
  input: string | Date | Dayjs | null | undefined,
  isDdMmmYyyy?: boolean
): string {
  if (input == null || input === "") return "";

  const date = isDdMmmYyyy ? dayjs(input, "DD MMM YYYY") : dayjs(input);

  return date.isValid() ? `${date.format("YYYY-MM-DD")}` : "";
}

export const roles = [
  { label: "Tester", value: "Tester" },
  { label: "Developer", value: "Developer" },
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Full Stack Developer", value: "Full Stack Developer" },
  { label: "DevOps Engineer", value: "DevOps Engineer" },
  { label: "Project Manager", value: "Project Manager" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Software Architect", value: "Software Architect" },
  { label: "UI/UX Designer", value: "UI/UX Designer" },
  { label: "Data Engineer", value: "Data Engineer" },
  { label: "Mobile Developer", value: "Mobile Developer" },
  { label: "Security Engineer", value: "Security Engineer" },
  { label: "AI Engineer", value: "AI Engineer" },
];
