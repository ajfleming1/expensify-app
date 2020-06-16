import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import { getMockRouterProps } from "../__mocks__/getMockRouterProps";

let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
let history;
let editExpense: jest.Mock<any, any>;
let removeExpense: jest.Mock<any, any>;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = getMockRouterProps<EditExpensePage>(null).history;
  wrapper = shallow(
    <EditExpensePage
      history={history}
      editExpense={editExpense}
      removeExpense={removeExpense}
      expense={expenses[2]}
    />);
});

test("should render EditExpensePage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith({ id: expenses[2].id, updates: expenses[2] });
});

test("should handle removeExpese", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});