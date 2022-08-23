// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);
import { config } from "@config/firebaseConfig";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB_llMebBmwt1bsMBbnauZ10DpWwhkLPT0",
  projectId: "wondering-pill-2e9e6",
  messagingSenderId: "550774941905",
  appId: "1:550774941905:web:564cca83dfaed8417b7df0",
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  self.clients.openWindow("https://naver.com");
});
