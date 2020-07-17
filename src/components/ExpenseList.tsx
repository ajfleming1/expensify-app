import React from "react";
import { Props, connector } from "../@types/rootState";
import ExpenseListItem from "./ExpenseListItem";
import { Expense } from "../@types/expenseTypes";

export const ExpenseList = (props: Props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No Expenses</p>
      ) : (
          props.expenses.map((expense: Expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )
    }
  </div>
);

export default connector(ExpenseList);
