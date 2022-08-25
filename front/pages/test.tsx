import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@utils/firebase";

const Test: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getMessageToken() {
      const temp = await getToken();
      if (temp !== null) {
        setToken(temp);
      }
      console.log(temp);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });

      navigator.serviceWorker.addEventListener("notificationclick", (event) => {
        console.log("click!!!!!!");
      });
    }

    getMessageToken();
  }, []);

  return <>{token}</>;
};

export default Test;
