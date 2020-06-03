import { Moment } from "moment";

// Filter Action Types
const SET_TEXT_FILTER = "SET_TEXT_FILTER";
const SORT_BY_DATE = "SORT_BY_DATE";
const SORT_BY_AMOUNT = "SORT_BY_AMOUNT";
const SET_START_DATE = "SET_START_DATE";
const SET_END_DATE = "SET_END_DATE";

// Filter Actions
type SetTextFilterAction = {
  type: typeof SET_TEXT_FILTER,
  text: string
};
type SortByDateFilterAction = {
  type: typeof SORT_BY_DATE
};
type SortByAmountFilterAction = {
  type: typeof SORT_BY_AMOUNT
};
type SetStartDateFilterAction = {
  type: typeof SET_START_DATE,
  startDate: Moment
};
type SetEndDateFilterAction = {
  type: typeof SET_END_DATE,
  endDate: Moment
};

// SET_TEXT_FILTER
export const setTextFilter = (text: string = ""): SetTextFilterAction => ({
  type: SET_TEXT_FILTER,
  text
});

// SORT_BY_DATE
export const sortByDate = (): SortByDateFilterAction => ({
  type: SORT_BY_DATE
});

// SORT_BY_AMOUNT
export const sortByAmount = (): SortByAmountFilterAction => ({
  type: SORT_BY_AMOUNT
});

// SET_START_DATE
export const setStartDate = (startDate: Moment = undefined): SetStartDateFilterAction => ({
  type: SET_START_DATE,
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate: Moment = undefined): SetEndDateFilterAction => ({
  type: SET_END_DATE,
  endDate
});