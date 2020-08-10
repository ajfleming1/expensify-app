import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { Moment } from "moment";
import { Props, connector } from "../@types/rootState";

export class ExpenseListFilters extends React.Component<Props> {
  state = {
    calenderFocused: null as FocusedInputShape
  };

  onDatesChange = ({ startDate, endDate }: { startDate: Moment, endDate: Moment }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calenderFocused: FocusedInputShape) => {
    this.setState({ calenderFocused });
  }

  onTextChange = (e: any) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e: any) => {
    e.target.value === "date" ?
      this.props.sortByDate() :
      this.props.sortByAmount()
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select value={this.props.filters.sortBy}
              onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
};

export default connector(ExpenseListFilters);