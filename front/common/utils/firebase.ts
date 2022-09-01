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

  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    const icon = "/images/logo.png";
    const options = { body, icon };
    const notif = new Notification(title, options);

    notif.onclick = (event) => {
      event.preventDefault();
      window.open("/login");
    };
  });

  return token;
}
