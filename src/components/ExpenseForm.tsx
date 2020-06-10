import React, { ChangeEvent, FormEvent } from "react";
import moment, { Moment } from "moment";
import { SingleDatePicker } from "react-dates";
import { v4 as uuid } from 'uuid';
import 'react-dates/initialize';
import { UpdateExpenseType, ExepenseItemType } from "../@types/expenseTypes";

class ExpenseForm extends React.Component<{ expense?: ExepenseItemType, onSubmit: (expense: UpdateExpenseType) => void }> {
  state = {} as {
    description: string,
    note: string,
    amount: string,
    createdAt: Moment,
    calendarFocused: boolean,
    error: string
  };

  constructor(props: { expense: ExepenseItemType; onSubmit: (expense: UpdateExpenseType) => void; }) {
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
          <button>{this.props.expense ? "Update Expense" : "Add Expense"}</button>
        </form>
      </div>
    )
  }
};

export default ExpenseForm;