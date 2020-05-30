import React from "react";
import { Props, connector } from "../@types/rootState";
import { connect } from "react-redux";
import { setTextFilter } from "../actions/filters";
const ExpenseListFilters = (props: Props) => (
  <div>
    <input type="text" value={props.filters.text} onChange=
      {
        (e) => props.dispatch(setTextFilter(e.target.value))
      }
    />
  </div>
);

export default connector(ExpenseListFilters);