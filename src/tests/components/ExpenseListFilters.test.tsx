import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import { getMockDispatchProps, getMockRouterProps } from "../__mocks__/getMockRouterProps";

const routerProps = getMockRouterProps(null);
const mockDispatchProps = getMockDispatchProps(null);
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;
let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      expenses={undefined}
      history={routerProps.history}
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
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