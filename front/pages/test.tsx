import type { NextPage } from "next";
import { useRouter } from "next/router";
import { firebaseCloudMessaging } from "../firebase";
import { getToken } from "firebase/messaging";

const Test: NextPage = () => {
  const router = useRouter();

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
