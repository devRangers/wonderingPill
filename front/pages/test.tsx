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
    getMessageToken();
  }, []);

  return <>{token}</>;
};

export default Test;
