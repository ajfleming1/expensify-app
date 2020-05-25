import { createStore, combineReducers } from "redux";

const demoState = {
  expenses: [{
    id: "abcd",
    description: "January Rent",
    note: "This was the final payment for that address",
    amount: 54500,
    createAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "amount" as "amount" | "date",
    startDate: undefined as Date,
    endDate: undefined as Date
  }
};

type DemoStateType = typeof demoState;