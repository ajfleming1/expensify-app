import React from "react";
import selectExpensesTotal from "../selectors/expenses-total";
import { RootState } from "../@types/rootState";
import selectExpenses from "../selectors/expenses";
import numerial from "numeral";
import { connect } from "react-redux";

export const ExpensesSummary = ({ expenseCount, expensesTotal }: { expenseCount: number, expensesTotal: number }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {numerial(expensesTotal / 100).format("$0,0.00")}.
      </h1>
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