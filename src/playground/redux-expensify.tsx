import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';
// Types
type ExpenseActionTypes = AddExpenseAction | RemoveExpenseAction | EditExpenseAction;
type FilterActionTypes = SetTextFilterAction;
type ExepenseItemType = {
  id: string,
  description: string,
  note: string,
  amount: number,
  createdAt: number
};

type FiltersStateType = {
  text: string,
  sortBy: "amount" | "date",
  startDate: Date,
  endDate: Date
};

type UpdateExpenseType = {
  description?: string, 
  amount?: number, 
  notes?: string, 
  createdAt?: number
}

// Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const REMOVE_EXPENSE = "REMOVE_EXPENSE";
const EDIT_EXPENSE = "EDIT_EXPENSE";
const SET_TEXT_FILTER = "SET_TEXT_FILTER";
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

type SetTextFilterAction = {
  type: typeof SET_TEXT_FILTER,
  text: string
};


// Default States
const expensesDefaultState = [] as ExepenseItemType[];
const filtersDefaultState: FiltersStateType =
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
const editExpense = ( {id, updates}: 
  {id: string, updates: UpdateExpenseType}): EditExpenseAction => (
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
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer
const expensesReducer = (state: ExepenseItemType[] = expensesDefaultState, action: ExpenseActionTypes): ExepenseItemType[] => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.id)
    case EDIT_EXPENSE:
      return state.map((expense) => {
        if(expense.id === action.id){
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
const filtersReducers = (state: FiltersStateType = filtersDefaultState, action: FilterActionTypes): FiltersStateType => {
  switch (action.type) {
    case SET_TEXT_FILTER: 
      return {
        ...state,
        text: action.text
      }
    default: return state;
  }
};

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
  console.log(store.getState())
});

const expenseOne = store.dispatch(addExpense({
  description: "Rent",
  amount: 100
}));

const expenseTwo = store.dispatch(addExpense({
  description: "Coffee",
  amount: 300
}));

console.log(expenseOne);
store.dispatch(removeExpense({
  id: expenseOne.expense.id
}));

store.dispatch(editExpense({
  id: expenseTwo.expense.id,
  updates: {
    amount: 500
  }
}));

store.dispatch(setTextFilter("rent"));
store.dispatch(setTextFilter());
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
//     startDate: undefined as Date,
//     endDate: undefined as Date
//   }
// };

// const user = {
//   name: "Jen",
//   age: 24
// };

// console.log({
//   age: 27,
//   ...user,
//   location: "Bristol"
// });