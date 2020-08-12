import React from "react";
import { Expense } from "../@types/expenseTypes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numerial from "numeral";

export const ExpenseListItem = (expense: Expense) => (
  <Link className="list-item" to={`/edit/${expense.id}`}>
    <div>
      <h3 className="list-item__title">
        {expense.description}
      </h3>
      <span className="list-item__subtitle">
        {moment(expense.createdAt).format("MMMM Do, YYYY")}
      </span>
    </div>
    <h3 className="list-item__data">
      {numerial(expense.amount / 100).format("$0,0.00")}
    </h3>
  </Link>
);

export default connect()(ExpenseListItem);