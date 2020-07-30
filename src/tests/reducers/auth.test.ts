import authReducer from "../../reducers/auth";
import { LOGIN, LOGOUT } from "../../@types/authTypes";

test("should set uid for login", () => {
  const action = { type: LOGIN, uid: "12345" };
  const state: {} | { uid: string, type: typeof LOGIN } = authReducer(undefined, action);
  expect(state).toEqual({ uid: action.uid });
});

test("should clear uid for logout", () => {
  const action = { type: LOGOUT };
  const state: {} | { uid: string, type: typeof LOGOUT } = authReducer({ uid: 12345 }, action);
  expect(state).toEqual({});
});