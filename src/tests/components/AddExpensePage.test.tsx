import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import { getMockRouterProps } from "../__mocks__/getMockRouterProps";
import { UpdateExpenseType } from "../../@types/expenseTypes";

const routerProps = getMockRouterProps<AddExpensePage>(null);
let onSubmit: (expense: UpdateExpenseType) => void;
let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
beforeEach(() => {
  onSubmit = jest.fn();
  wrapper = shallow(<AddExpensePage
    expenses={undefined}
    dispatch={undefined}
    filters={undefined}
    onSubmit={onSubmit}
    history={routerProps.history} />);
});

test("should render add expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSumbit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[1]);
  expect(routerProps.history.push).toHaveBeenLastCalledWith("/");
  expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
});