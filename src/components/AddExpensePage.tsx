import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { Expense } from "../@types/expenseTypes";
import { Props } from "../@types/rootState";
import { startAddExpense } from "../actions/expenses";
import { Dispatch } from "redux";

export class AddExpensePage extends React.Component<Props & DispatchProps> {
  onSubmit = (expense: Expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Add Expense </h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

interface DispatchProps {
  startAddExpense: (expense: Expense) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startAddExpense: (expense: Expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);