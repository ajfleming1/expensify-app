import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../@types/rootState";
import { ExepenseItemType, EditExpenseAction, RemoveExpenseAction } from "../@types/expenseTypes";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";
import { withRouter } from "react-router-dom";
type IdParams = { id: string, expense: string };

const EditExpensePage = (props: {
  expense: ExepenseItemType;
  dispatch: (action: EditExpenseAction | RemoveExpenseAction) => void;
  history: string[];
}) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense: ExepenseItemType) => {
          // Dispatch the action to edit the expense
          // Redirect to the dashboard
          props.dispatch(editExpense({ id: props.expense.id, updates: expense }));
          props.history.push("/");
        }}
      />
      <button onClick={
        (e) => {
          props.dispatch(removeExpense({ id: props.expense.id }));
          props.history.push("/");
        }
      }>Remove</button>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: RouteComponentProps<IdParams>) => (
  {
    expense: state.expenses.find((expense: ExepenseItemType) => expense.id === props.match.params.id)
  }
);

export default withRouter(connect(mapStateToProps)(EditExpensePage));