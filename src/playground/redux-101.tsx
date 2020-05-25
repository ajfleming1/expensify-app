import { createStore } from "redux";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const SET = "SET";
type ActionTypes = IncrementAction | DecrementAction | ResetAction | SetAction;
type StateType = {
  count: number
};

interface IncrementAction {
  type: typeof INCREMENT
  incrementBy?: number
};

interface DecrementAction {
  type: typeof DECREMENT
  decrementBy?: number
};

interface ResetAction {
  type: typeof RESET
};

interface SetAction {
  type: typeof SET,
  count: number
};

type AdjustByType = {
  value: number;
}

// Action generators - functions that return action objects.
const incrementCount = ({ value }: AdjustByType = { value: 1 }): IncrementAction => (
  {
    type: INCREMENT,
    incrementBy: value
  }
);

const decrementCount = ({ value }: AdjustByType = { value: 1 }): DecrementAction => (
  {
    type: DECREMENT,
    decrementBy: value
  }
);

const resetCount = (): ResetAction => (
  {
    type: RESET
  }
);

const setCount = ({ value }: AdjustByType): SetAction => (
  {
    type: "SET",
    count: value
  }
);

// Reducer
// 1. Reducers are pure functions
// 1.1 (Not just a function - output is only determined by input, nothing is changed outside the reducer).
// 2. Never change state or action arguments.
const countReducer = (state: StateType = { count: 0 }, action: ActionTypes): StateType => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + action.incrementBy
      };
    case DECREMENT:
      return {
        count: state.count - action.decrementBy
      };
    case SET: {
      return {
        count: action.count
      };
    }
    case RESET:
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Action - an object that gets sent to the store.
// I'd like to increment the count.
// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5
// });

store.dispatch(incrementCount({ value: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ value: 10 }));

store.dispatch(setCount({ value: 101 }));