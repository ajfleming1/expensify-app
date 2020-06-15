import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { UpdateExpenseType } from "../@types/expenseTypes";
import { Props } from "../@types/rootState";
import { addExpense } from "../actions/expenses";
import { Dispatch } from "redux";

export class AddExpensePage extends React.Component<Props & DispatchProps> {
  onSubmit = (expense: UpdateExpenseType) => {
    this.props.onSubmit(expense);
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
  onSubmit: (expense: UpdateExpenseType) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (expense: UpdateExpenseType) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);