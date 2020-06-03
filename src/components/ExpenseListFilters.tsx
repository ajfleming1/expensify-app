import React from "react";
import { Props, connector } from "../@types/rootState";
import { v4 as uuidv4 } from 'uuid';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { Moment } from "moment";

class ExpenseListFilters extends React.Component<Props> {
  state = {
    calenderFocused: null as FocusedInputShape
  };

  onDatesChange = ({ startDate, endDate }: { startDate: Moment, endDate: Moment }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = (calenderFocused: FocusedInputShape) => {
    this.setState({ calenderFocused });
  }

  render() {
    return (
      <div>
        <input type="text"
          value={this.props.filters.text}
          onChange={(e) => this.props.dispatch(setTextFilter(e.target.value))}
        />
        <select value={this.props.filters.sortBy}
          onChange={
            (e) => e.target.value === "date" ?
              this.props.dispatch(sortByDate()) :
              this.props.dispatch(sortByAmount())
          }>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
          startDateId={uuidv4()} // PropTypes.string.isRequired,
          endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
          endDateId={uuidv4()} // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />

      </div>

    );
  }
}

export default connector(ExpenseListFilters);