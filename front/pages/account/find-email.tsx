import type { NextPage } from "next";
import { useState } from "react";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";
import Recaptcha from "@accountComp/Recaptcha";

const FindEmailPage: NextPage = () => {
  const [startVerification, setStartVerification] = useState(false); // ReCaptcha 검증 시점 결정
  const [successVerification, setSuccessVerification] = useState(false); // ReCaptcha 검증 성공 여부
  return (
    <>
      <Container>
        <FindEmailForm setStartVerification={setStartVerification} />
      </Container>
      <Recaptcha
        startVerification={startVerification}
        setStartVerification={setStartVerification}
        setSuccessVerification={setSuccessVerification}
      />
    </>
  );
};

export default FindEmailPage;
