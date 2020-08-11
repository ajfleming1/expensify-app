import React, { Dispatch } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../@types/rootState";
import { EditExpenseAction, RemoveExpenseAction, Expense } from "../@types/expenseTypes";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
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
    this.props.startEditExpense({ id: this.props.expense.id, updates: expense });
    this.props.history.push("/");
  };
  startRemoveExpense = (e: any) => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.startRemoveExpense}>Remove Expense</button>
        </div>
      </div>
    );
  }
};

interface DispatchProps {
  startEditExpense({ id, updates }: { id: string; updates: Expense }): EditExpenseAction,
  startRemoveExpense({ id }: { id: string }): RemoveExpenseAction
}

const mapDispatchToProps = (dispatch: (arg0: { type: "EDIT_EXPENSE" | "REMOVE_EXPENSE"; id: string; updates?: Expense; }) => any) => ({
  startEditExpense: ({ id, updates }: { id: string; updates: Expense; }) => dispatch(startEditExpense({ id, updates })),
  startRemoveExpense: ({ id }: { id: string }) => dispatch(startRemoveExpense({ id }))
});

const mapStateToProps = (state: RootState, props: RouteComponentProps<IdParams>) => (
  {
    expense: state.expenses.find((expense: Expense) => expense.id === props.match.params.id)
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditExpensePage));