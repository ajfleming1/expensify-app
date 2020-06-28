import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should have correct output for two items", () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={195} />);
  expect(wrapper).toMatchSnapshot();
});

test("should have correct output for two items", () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={10} expensesTotal={1124566} />);
  expect(wrapper).toMatchSnapshot();
});