import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCZDLXtdGghhgHBiXtjfd8XI7aG3rUg044",
  authDomain: "real-notification-4d552.firebaseapp.com",
  projectId: "real-notification-4d552",
  storageBucket: "real-notification-4d552.appspot.com",
  messagingSenderId: "999347339020",
  appId: "1:999347339020:web:4aa1b707a997d79ba4d329",
  measurementId: "G-HXNB6W0JEX",
};

export const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
