import filtersReduer from "../../reducers/filters";
import {
  FiltersType, FilterActionTypes,
  SORT_BY_AMOUNT, SORT_BY_DATE, SET_TEXT_FILTER, SET_START_DATE, SET_END_DATE
} from "../../@types/filterTypes";
import moment from "moment";

test("should setup default filter values", () => {
  const state: FiltersType = filtersReduer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sort by to amount", () => {
  const state: FiltersType = filtersReduer(undefined, { type: SORT_BY_AMOUNT });
  expect(state.sortBy).toBe("amount");
});

test("should set sort by to date", () => {
  const currentState: FiltersType = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  };

  const action: FilterActionTypes = { type: SORT_BY_DATE }
  const state: FiltersType = filtersReduer(currentState, action);
  expect(state.sortBy).toBe("date");
});


test("should set text filter", () => {
  const text = "text filter";
  const state: FiltersType = filtersReduer(undefined, { type: SET_TEXT_FILTER, text });
  expect(state.text).toBe(text);
});

test("should set start date filter", () => {
  const startDate = moment();
  const state: FiltersType = filtersReduer(undefined, { type: SET_START_DATE, startDate });
  expect(state.startDate).toEqual(startDate);
});

test("should set end date filter", () => {
  const endDate = moment();
  const state: FiltersType = filtersReduer(undefined, { type: SET_END_DATE, endDate });
  expect(state.endDate).toEqual(endDate);
});