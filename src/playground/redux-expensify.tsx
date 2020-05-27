import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';
// Types
type ExpenseActionTypes = AddExpenseAction | RemoveExpenseAction | EditExpenseAction;
type FilterActionTypes = SetTextFilterAction | SortByDateFilterAction | SortByAmountFilterAction |
  SetStartDateFilterAction | SetEndDateFilterAction;
type ExepenseItemType = {
  id: string,
  description: string,
  note: string,
  amount: number,
  createdAt: number
};

type FiltersType = {
  text: string,
  sortBy: "amount" | "date",
  startDate: number,
  endDate: number
};

type UpdateExpenseType = {
  description?: string,
  amount?: number,
  notes?: string,
  createdAt?: number
}

// Expense Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const REMOVE_EXPENSE = "REMOVE_EXPENSE";
const EDIT_EXPENSE = "EDIT_EXPENSE";
type AddExpenseAction = {
  type: typeof ADD_EXPENSE,
  expense: ExepenseItemType
};

type RemoveExpenseAction = {
  type: typeof REMOVE_EXPENSE,
  id: string
};

type EditExpenseAction = {
  type: typeof EDIT_EXPENSE,
  id: string,
  updates: UpdateExpenseType
};

// Filter Action Types
const SET_TEXT_FILTER = "SET_TEXT_FILTER";
const SORT_BY_DATE = "SORT_BY_DATE";
const SORT_BY_AMOUNT = "SORT_BY_AMOUNT";
const SET_START_DATE = "SET_START_DATE";
const SET_END_DATE = "SET_END_DATE";
type SetTextFilterAction = {
  type: typeof SET_TEXT_FILTER,
  text: string
};
type SortByDateFilterAction = {
  type: typeof SORT_BY_DATE
};
type SortByAmountFilterAction = {
  type: typeof SORT_BY_AMOUNT
};
type SetStartDateFilterAction = {
  type: typeof SET_START_DATE,
  startDate: number
}
type SetEndDateFilterAction = {
  type: typeof SET_END_DATE,
  endDate: number
}

// Default States
const expensesDefaultState = [] as ExepenseItemType[];
const filtersDefaultState: FiltersType =
{
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

// Actions
// ADD_EXPENSE
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 }): AddExpenseAction => (
  {
    type: ADD_EXPENSE,
    expense: {
      id: uuidv4(),
      description,
      note,
      amount,
      createdAt
    }
  }
);

// REMOVE_EXPENSE
const removeExpense = ({ id }: { id: string }): RemoveExpenseAction => (
  {
    type: REMOVE_EXPENSE,
    id
  }
);

// EDIT_EXPENSE
const editExpense = ({ id, updates }:
  { id: string, updates: UpdateExpenseType }): EditExpenseAction => (
    {
      type: EDIT_EXPENSE,
      id,
      updates
    }
  );

// SET_TEXT_FILTER
const setTextFilter = (text: string = ""): SetTextFilterAction => ({
  type: SET_TEXT_FILTER,
  text
});

// SORT_BY_DATE
const sortByDate = (): SortByDateFilterAction => ({
  type: SORT_BY_DATE
});

// SORT_BY_AMOUNT
const sortByAmount = (): SortByAmountFilterAction => ({
  type: SORT_BY_AMOUNT
});

// SET_START_DATE
const setStartDate = (startDate: number = undefined): SetStartDateFilterAction => ({
  type: SET_START_DATE,
  startDate
});

// SET_END_DATE
const setEndDate = (endDate: number = undefined): SetEndDateFilterAction => ({
  type: SET_END_DATE,
  endDate
});

// Expenses Reducer
const expensesReducer = (state: ExepenseItemType[] = expensesDefaultState, action: ExpenseActionTypes): ExepenseItemType[] => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.id)
    case EDIT_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default: return state;
  }
};

// Filters Reducer
const filtersReducers = (state: FiltersType = filtersDefaultState, action: FilterActionTypes): FiltersType => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      }
    case SORT_BY_DATE: {
      return {
        ...state,
        sortBy: "date"
      }
    }
    case SORT_BY_AMOUNT: {
      return {
        ...state,
        sortBy: "amount"
      }
    }
    case SET_START_DATE: {
      return {
        ...state,
        startDate: action.startDate
      }
    }
    case SET_END_DATE: {
      return {
        ...state,
        endDate: action.endDate
      }
    }
    default: return state;
  }
};

// Timestamp - any positive or negative integer value - counted in ms. 33400, -10, -3
// Timestamp 0 - Jan 1st 12:00 AM 1970. Unix Epoch
// Get Visible Expenses
const getVisibleExpenses = (expenses: ExepenseItemType[], { text, sortBy, startDate, endDate }: FiltersType): ExepenseItemType[] => {
  return expenses.filter((expense: ExepenseItemType) => {
    const startDateMatch: boolean = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch: boolean = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch: boolean = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a: ExepenseItemType, b: ExepenseItemType) => {
    if (sortBy === "date") {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if(sortBy === "amount" ){
      return a.amount < b.amount ? 1 : -1;
    }
  });
}

// Combine Reducers
const store = createStore(
  combineReducers(
    {
      expenses: expensesReducer,
      filters: filtersReducers
    })
);

// Mutate store
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses)
});

const expenseOne = store.dispatch(addExpense({
  description: "Rent",
  amount: 100,
  createdAt: -21000
}));

const expenseTwo = store.dispatch(addExpense({
  description: "Coffee",
  amount: 300,
  createdAt: -1000
}));

// console.log(expenseOne);
// store.dispatch(removeExpense({
//   id: expenseOne.expense.id
// }));

// store.dispatch(editExpense({
//   id: expenseTwo.expense.id,
//   updates: {
//     amount: 500
//   }
// }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));

// const demoState = {
//   expenses: [{
//     id: "abcd",
//     description: "January Rent",
//     note: "This was the final payment for that address",
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: "rent",
//     sortBy: "amount" as "amount" | "date",
//     startDate: undefined as number,
//     endDate: undefined as number
//   }
// };

// Object Spread
// const user = {
//   name: "Jen",
//   age: 24
// };

// console.log({
//   ...user,
//   location: "Bristol",
//   age: 27
// });

// Array Spread
// const names = ["Drew", "Fleming"];
// const newNames = [...names, "Interesting"];
// console.log(newNames);