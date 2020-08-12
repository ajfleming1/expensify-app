import React from "react";
import { Props, connector } from "../@types/rootState";
import ExpenseListItem from "./ExpenseListItem";
import { Expense } from "../@types/expenseTypes";

export const ExpenseList = (props: Props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message"><span>No Expenses</span></div>
        ) : (
            props.expenses.map((expense: Expense) => {
              return <ExpenseListItem key={expense.id} {...expense} />
            })
          )
      }
    </div>
  </div>
);

export default connector(ExpenseList);
