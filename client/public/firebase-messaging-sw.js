importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
    apiKey: "AIzaSyCZDLXtdGghhgHBiXtjfd8XI7aG3rUg044",
    authDomain: "real-notification-4d552.firebaseapp.com",
    projectId: "real-notification-4d552",
    storageBucket: "real-notification-4d552.appspot.com",
    messagingSenderId: "999347339020",
    appId: "1:999347339020:web:4aa1b707a997d79ba4d329",
    measurementId: "G-HXNB6W0JEX",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});