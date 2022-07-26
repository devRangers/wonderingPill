import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { botDetect, useBotdReady } from "@lib/botd/script";
import Container from "@userContainer/Container";
import LoginForm from "@loginComp/LoginForm";

const LoginPage: NextPage = () => {
  const botdReady = useBotdReady();
  const router = useRouter();

  const [isBot, setIsBot] = useState(true);

  useEffect(() => {
    if (!botdReady) return;
    botDetect().then((result) => {
      if (result > 1) {
        router.push("/blocked");
      } else {
        setIsBot(false);
      }
    });
  }, [botdReady]);

  return (
    <>
      {!isBot && (
        <Container>
          <LoginForm />
        </Container>
      )}
    </>
  );
};

export default LoginPage;
