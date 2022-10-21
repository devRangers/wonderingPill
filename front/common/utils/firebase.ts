import firebase from "firebase/app";

export async function getToken() {
  if (firebase.messaging.isSupported() === false) {
    console.log("isSupported: ", firebase.messaging.isSupported());
    return null;
  }

  const messaging = firebase.messaging();
  const token = await messaging.getToken({
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
  });

  messaging.onMessage(({ data }) => {
    const { title, body, icon } = data;
    const options = { body, icon };
    const notif = new Notification(title, options);
  });

  return token;
}
