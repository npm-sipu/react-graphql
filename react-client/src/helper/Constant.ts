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
