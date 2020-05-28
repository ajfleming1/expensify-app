// Filter Action Types
export const SET_TEXT_FILTER = "SET_TEXT_FILTER";
export const SORT_BY_DATE = "SORT_BY_DATE";
export const SORT_BY_AMOUNT = "SORT_BY_AMOUNT";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export type SetTextFilterAction = {
  type: typeof SET_TEXT_FILTER,
  text: string
};
export type SortByDateFilterAction = {
  type: typeof SORT_BY_DATE
};
export type SortByAmountFilterAction = {
  type: typeof SORT_BY_AMOUNT
};
export type SetStartDateFilterAction = {
  type: typeof SET_START_DATE,
  startDate: number
};
export type SetEndDateFilterAction = {
  type: typeof SET_END_DATE,
  endDate: number
};

// FiltersType
export type FiltersType = {
  text: string,
  sortBy: "amount" | "date",
  startDate: number,
  endDate: number
};

// FilterActionTypes
export type FilterActionTypes = SetTextFilterAction | SortByDateFilterAction | SortByAmountFilterAction |
  SetStartDateFilterAction | SetEndDateFilterAction;