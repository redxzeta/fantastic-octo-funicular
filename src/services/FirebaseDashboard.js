import firebase from "firebase";

const config = {
  apiKey: `${process.env.REACT_APP_FBAPI}`,
  authDomain: `${process.env.REACT_APP_AUTH}`,
  databaseURL: `${process.env.REACT_APP_DB}`,
  projectId: `${process.env.REACT_APP_PROJECT}`,
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.firestore();

export const userCreate = (userForm) => {
  const dabe = firebase.firestore();
  dabe.collection("users").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    username: userForm.username,
    email: userForm.email,
    uid: userForm.uid,
  });
};
