import { setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter } from "../../actions/filters";
import moment from "moment";
import { SET_START_DATE, SET_END_DATE, SORT_BY_DATE, SORT_BY_AMOUNT, SET_TEXT_FILTER } from "../../@types/filterTypes";

test("should generate set start date action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: SET_START_DATE,
        startDate: moment(0)
    });
});

test("should generate set end date action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: SET_END_DATE,
        endDate: moment(0)
    });
});

test("should generate sort by date action object", () => {
    expect(sortByDate()).toEqual({ type: SORT_BY_DATE });
});

test("should generate sort by amount action object", () => {
    expect(sortByAmount()).toEqual({ type: SORT_BY_AMOUNT });
});

test("should generate text filter with provided arguments", () => {
    expect(setTextFilter("test")).toEqual({ type: SET_TEXT_FILTER, text: "test" });
});

test("should generate text filter with default arguments", () => {
    expect(setTextFilter()).toEqual({ type: SET_TEXT_FILTER, text: "" });
});