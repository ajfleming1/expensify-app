import React, { Dispatch } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../@types/rootState";
import { EditExpenseAction, RemoveExpenseAction, Expense } from "../@types/expenseTypes";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense, addExpense } from "../actions/expenses";
import { withRouter } from "react-router-dom";
import { History, LocationState } from "history";
type IdParams = { id: string, expense: string };

// Refactor EditExpensePage to be class component.
// Set up mapDispatchToProps editExpense and removeExpense

// should render EditExpensePage - snapshot
// should handle editExpense - spies
// should handle removeExpese - spies

export class EditExpensePage extends React.Component<{
  expense: Expense;
  history: History<LocationState>;
} & DispatchProps> {
  onSubmit = (expense: Expense) => {
    // Dispatch the action to edit the expense
    // Redirect to the dashboard
    this.props.editExpense({ id: this.props.expense.id, updates: expense });
    this.props.history.push("/");
  };
  removeExpense = (e: any) => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.removeExpense}>Remove</button>
      </div>
    );
  }
};

interface DispatchProps {
  editExpense({ id, updates }: { id: string; updates: Expense }): EditExpenseAction,
  removeExpense({ id }: { id: string }): RemoveExpenseAction
}

const mapDispatchToProps = (dispatch: (arg0: { type: "EDIT_EXPENSE" | "REMOVE_EXPENSE"; id: string; updates?: Expense; }) => any) => ({
  editExpense: ({ id, updates }: { id: string; updates: Expense; }) => dispatch(editExpense({ id, updates })),
  removeExpense: ({ id }: { id: string }) => dispatch(removeExpense({ id }))
});

const mapStateToProps = (state: RootState, props: RouteComponentProps<IdParams>) => (
  {
    expense: state.expenses.find((expense: Expense ) => expense.id === props.match.params.id)
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditExpensePage));