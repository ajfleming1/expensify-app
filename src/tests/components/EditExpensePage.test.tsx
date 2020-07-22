import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import { getMockRouterProps } from "../__mocks__/getMockRouterProps";

let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
let history;
let startEditExpense: jest.Mock<any, any>;
let startRemoveExpense: jest.Mock<any, any>;
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = getMockRouterProps<EditExpensePage>(null).history;
  wrapper = shallow(
    <EditExpensePage
      history={history}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      expense={expenses[2]}
    />);
});

test("should render EditExpensePage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith({ id: expenses[2].id, updates: expenses[2] });
});

test("should handle startRemoveExpense", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});