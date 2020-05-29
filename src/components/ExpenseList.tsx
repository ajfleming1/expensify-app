import React from "react";
import { Props, connector } from "../@types/rootState";
import ExpenseListItem from "./ExpenseListItem";
const ExpenseList = (props: Props) => (
  <div>
    <h1>Expense List</h1>
    {
      props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />
      })
    }
  </div>
);

export default connector(ExpenseList);
