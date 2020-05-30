import React from "react";
import { ExepenseItemType } from "../@types/expenseTypes";
import { DispatchProp, connect } from "react-redux";
import { AnyAction } from "redux";
import { removeExpense } from "../actions/expenses";

const ExpenseListItem = (
  { dispatch, id, description, amount, createdAt }
    : ExepenseItemType & DispatchProp<AnyAction>) => (
    <div>
      <h3>{description}</h3>
      <p>{amount} - {createdAt}</p>
      <button onClick=
        {
          (e) => {
            dispatch(removeExpense({ id: id }))
          }
        }>Remove</button>
    </div>
  );

export default connect()(ExpenseListItem);