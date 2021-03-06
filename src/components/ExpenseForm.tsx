import React, { ChangeEvent, FormEvent } from "react";
import moment, { Moment } from "moment";
import { SingleDatePicker } from "react-dates";
import { v4 as uuid } from 'uuid';
import 'react-dates/initialize';
import { Expense } from "../@types/expenseTypes";

class ExpenseForm extends React.Component<{ expense?: Expense, onSubmit: (expense: Expense) => void }> {
  state = {} as {
    description: string,
    note: string,
    amount: string,
    createdAt: Moment,
    calendarFocused: boolean,
    error: string
  };

  constructor(props: { expense: Expense; onSubmit: (expense: Expense) => void; }) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

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

  onFocusChange = ({ focused }: { focused: boolean }) => {
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
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input type="text"
            placeholder="Description"
            className="text-input"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            className="text-input"
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
            className="text-area"
            onChange={this.onNoteChange} >
          </textarea>
          <div>
            <button className="button">{this.props.expense ? "Update Expense" : "Add Expense"}</button>
          </div>
        </form>
    )
  }
};

export default ExpenseForm;