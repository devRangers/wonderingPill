import type { NextPage } from "next";
import { useState } from "react";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";
import Recaptcha from "@accountComp/Recaptcha";

const FindEmailPage: NextPage = () => {
  const [startVerification, setStartVerification] = useState(false); // ReCaptcha 검증 시점 결정
  const [token, setToken] = useState("");

  return (
    <>
      <Container>
        <FindEmailForm
          setStartVerification={setStartVerification}
          token={token}
          setToken={setToken}
        />
      </Container>
      <Recaptcha startVerification={startVerification} setToken={setToken} />
    </>
  );
};

export default FindEmailPage;
