import { LOGIN, LOGOUT } from "../@types/authTypes";
import {AuthActionTypes} from "../@types/authTypes";

export default (state: AuthActionTypes = {}, action: { type: any, uid?: string; }) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}