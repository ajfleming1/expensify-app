import React from "react";
import { Link } from "react-router-dom";
import selectExpensesTotal from "../selectors/expenses-total";
import { RootState } from "../@types/rootState";
import selectExpenses from "../selectors/expenses";
import numerial from "numeral";
import { connect } from "react-redux";

export const ExpensesSummary = ({ expenseCount, expensesTotal }: { expenseCount: number, expensesTotal: number }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{numerial(expensesTotal / 100).format("$0,0.00")}</span>.
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  }
};

const connector = connect(mapStateToProps);
export default connector(ExpensesSummary);