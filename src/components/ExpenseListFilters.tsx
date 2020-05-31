import React from "react";
import { Props, connector } from "../@types/rootState";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount } from "../actions/filters";

const ExpenseListFilters = (props: Props) => (
  <div>
    <input type="text"
      value={props.filters.text}
      onChange={(e) => props.dispatch(setTextFilter(e.target.value))}
    />
    <select value={props.filters.sortBy}
      onChange={
        (e) => e.target.value === "date" ?
          props.dispatch(sortByDate()) :
          props.dispatch(sortByAmount())
      }>
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

export default connector(ExpenseListFilters);