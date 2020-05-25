import { createStore } from "redux";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const SET = "SET";
type ActionTypes = IncrementAction | DecrementAction | ResetAction | SetAction;

type state = {
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

const store = createStore((state: state = { count: 0 }, action: ActionTypes) => {
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
});

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