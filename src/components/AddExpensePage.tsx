import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { UpdateExpenseType } from "../@types/expenseTypes";
import { Props } from "../@types/rootState";
import { addExpense } from "../actions/expenses";
const AddExpensePage = (props: Props) => (
  <div>
    <h1>Add Expense </h1>
    <ExpenseForm
      onSubmit={(expense: UpdateExpenseType) => {
        props.dispatch(addExpense(expense));
        props.history.push("/");
      }}
    />
  </div>
);

export default connect()(AddExpensePage);