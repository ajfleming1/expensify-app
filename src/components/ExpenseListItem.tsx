import React from "react";
import { Expense } from "../@types/expenseTypes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numerial from "numeral";

export const ExpenseListItem = (expense: Expense) => (
  <div>
    <Link to={`/edit/${expense.id}`}>
      <h3>
        {expense.description}
      </h3>
    </Link>
    <p>
      {numerial(expense.amount / 100).format("$0,0.00")}
      -
      {moment(expense.createdAt).format("MMMM Do, YYYY")}
    </p>
  </div>
);

export default connect()(ExpenseListItem);