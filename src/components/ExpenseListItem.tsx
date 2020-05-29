import React from "react";
import { ExepenseItemType } from "../@types/expenseTypes";

const ExpenseListItem = (props: ExepenseItemType) => (
  <div>
    <h3>{props.description}</h3>
    <p>{props.amount} - {props.createdAt}</p>
  </div>
);

export default ExpenseListItem;