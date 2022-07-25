import type { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "@userContainer/Container";
import LoginForm from "@loginComp/LoginForm";
import Botd, { botDetect } from "@lib/botd/script";

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <Botd
      onLoad={() => {
        Object.defineProperty(navigator, "userAgent", {
          value:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/90.0.4430.93 Safari/537.36",
          configurable: true,
        });
        botDetect().then((result: any) => {
          console.log(result);
          // if (result.bot.automationTool.probability === 1) {
          //   router.push("/");
          // }
        });
      }}>
      <Container>
        <LoginForm />
      </Container>
    </Botd>
  );
};

export default LoginPage;
