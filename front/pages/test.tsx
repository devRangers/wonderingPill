import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";

const Test: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const messaging = firebase.messaging();
    messaging
      .getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
      })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);

  const sendMessage = () => {
    const title = "궁금해 약";
    const body = "약을 복용할 시간입니다! \n가스모틴정 1정";
    const icon = "/images/logo.png";
    const options = { body, icon };

    const notif = new Notification(title, options);
  };

  const btnClickHandler = async () => {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      sendMessage();
    }
  };

  return (
    <>
      <button onClick={btnClickHandler}>알림 보내기</button>
      <button
        onClick={() =>
          router.push({ pathname: "/login", query: { error: "google" } })
        }>
        로그인페이지 이동
      </button>
    </>
  );
};

export default Test;
