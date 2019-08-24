import { TagType } from "scenes/FinancialForecast/TagType";

export type GlobalFiltersType = {
  startDate?: string,
  endDate?: string,
  tags?: TagType[],
  credit?: number[],
  debit?: number[],
  description?: string
};