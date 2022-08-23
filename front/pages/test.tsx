import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "@utils/firebase";

const Test: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function getMessageToken() {
      const token = await getToken();
      console.log(token);
    }
    getMessageToken();
  }, []);

  return (
    <>
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
