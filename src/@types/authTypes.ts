// LOGIN
export const LOGIN = "LOGIN";

// LOGOUT
export const LOGOUT = "LOGOUT";

type LoginAction = {
  type: typeof LOGIN,
  uid: string
};

type LogoutAction = {
  type: typeof LOGOUT
};

export type AuthActionTypes = LogoutAction | LoginAction | { };