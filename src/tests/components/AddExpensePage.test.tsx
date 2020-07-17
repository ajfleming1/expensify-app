import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import { getMockRouterProps, getMockDispatchProps } from "../__mocks__/getMockRouterProps";
import { Expense } from "../../@types/expenseTypes";

const mockDispatchProps = getMockDispatchProps(null);
const routerProps = getMockRouterProps<AddExpensePage>(null);
let startAddExpense: (expense: Expense) => void;
let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
beforeEach(() => {
  startAddExpense = jest.fn();
  wrapper = shallow(<AddExpensePage
    expenses={undefined}
    filters={undefined}
    startAddExpense={startAddExpense}
    history={routerProps.history}
    {...mockDispatchProps}
  />);
});

test("should render add expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSumbit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[1]);
  expect(routerProps.history.push).toHaveBeenLastCalledWith("/");
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});