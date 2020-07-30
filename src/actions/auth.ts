import { firebase, googleAuthProvider } from "../firebase/firebase";
import { LOGIN, LOGOUT } from "../@types/authTypes";

export const login = (uid: string) => ({
  uid,
  type: LOGIN
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
};

export const logout = () => ({
  type: LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}