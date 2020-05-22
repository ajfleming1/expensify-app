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

const store = createStore((state: state = { count: 0 }, action: ActionTypes) => {
  switch (action.type) {
    case INCREMENT:
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case DECREMENT:
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
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
store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
});

store.dispatch({
  type: SET,
  count: 101
});