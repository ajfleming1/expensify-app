import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import { getMockDispatchProps, getMockRouterProps } from "../__mocks__/getMockRouterProps";
import moment from "moment";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { FiltersType } from "../../@types/filterTypes";

const routerProps = getMockRouterProps(null);
const mockDispatchProps = getMockDispatchProps(null);
let wrapper: ShallowWrapper<
  { calenderFocused: FocusedInputShape; filters: FiltersType } &
  typeof routerProps &
  typeof mockDispatchProps, any, React.Component<{}, {}, any>
>;
beforeEach(() => {
  wrapper = shallow(
    <ExpenseListFilters
      expenses={undefined}
      history={routerProps.history}
      filters={filters}
      setTextFilter={undefined}
      sortByDate={undefined}
      sortByAmount={undefined}
      setStartDate={undefined}
      setEndDate={undefined}
      {...mockDispatchProps}
    />);
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "rent";
  const setTextFilter = jest.fn();
  wrapper.setProps({ setTextFilter: setTextFilter });
  wrapper.find("input").simulate("change", {
    target: { value }
  });

  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  const value = "date";
  const sortByDate = jest.fn();
  wrapper.setProps({ filters: altFilters });
  wrapper.setProps({ sortByDate: sortByDate });
  wrapper.find("select").simulate("change", {
    target: { value }
  });

  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  const sortByAmount = jest.fn();
  wrapper.setProps({ sortByAmount: sortByAmount });
  wrapper.find("select").simulate("change", {
    target: { value }
  });

  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const startDate = moment(0).add(4, "years");
  const endDate = moment(0).add(8, "years");
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();
  wrapper.setProps({ setStartDate: setStartDate, setEndDate: setEndDate });
  wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });

  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test("should handle date focus changes", () => {
  const calendarFocused: FocusedInputShape = "endDate";
  wrapper.find(DateRangePicker).prop("onFocusChange")(calendarFocused);
  expect(wrapper.state().calenderFocused).toBe(calendarFocused);
});