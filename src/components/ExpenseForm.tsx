import React, { ChangeEvent, FormEvent } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { v4 as uuid } from 'uuid';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { UpdateExpenseType } from "../@types/expenseTypes";

const now = moment();
console.log(now.format("MMM Do, YYYY"));
class ExpenseForm extends React.Component<{ onSubmit: (expense: UpdateExpenseType) => void }> {
  state = {
    description: "",
    note: "",
    amount: "",
    createdAt: moment(),
    calendarFocused: false,
    error: ""
  };

  onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt: moment.Moment) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }: any) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: "Please provide an amount and a description." }));
    }
    else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit(
        {
          description: this.state.description,
          amount: parseFloat(this.state.amount) * 100,
          createdAt: this.state.createdAt.valueOf(),
          note: this.state.note
        })
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            id={uuid()}
            numberOfMonths={1}
            isOutsideRange={() => (false)}
          />
          <textarea
            placeholder="Add a note for your expense (optional)."
            value={this.state.note}
            onChange={this.onNoteChange} >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
};

export default ExpenseForm;