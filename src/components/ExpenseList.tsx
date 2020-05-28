import React from "react";
import { Props, connector } from "../@types/rootState";

const ExpenseList = (props: Props) => (
  <div>
    <h1>Expense List</h1>
    {props.filters.text}
    {props.expenses.length}
  </div>
);

export default connector(ExpenseList);
