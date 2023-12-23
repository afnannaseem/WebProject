// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB3qBY43m3vwg9l-G1PIlLJPjv09zgtpNo",
  authDomain: "event-management-system-420af.firebaseapp.com",
  databaseURL:
    "https://event-management-system-420af-default-rtdb.firebaseio.com",
  projectId: "event-management-system-420af",
  storageBucket: "event-management-system-420af.appspot.com",
  messagingSenderId: "827531314946",
  appId: "1:827531314946:web:2fb531129c9c3fc3d9a41b",
  measurementId: "G-EC6LCTRWBC",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
