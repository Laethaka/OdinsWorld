import firebase from 'firebase'
const config = {
  apiKey: process.env.API_KEY,
  authDomain: "odinsworld-99dca.firebaseapp.com",
  databaseURL: "https://odinsworld-99dca.firebaseio.com",
  projectId: "odinsworld-99dca",
  storageBucket: "odinsworld-99dca.appspot.com",
  messagingSenderId: "260576085470"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;