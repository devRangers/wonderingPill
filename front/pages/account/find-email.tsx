import type { NextPage } from "next";
import { useState } from "react";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";
import Recaptcha from "@accountComp/Recaptcha";

const FindEmailPage: NextPage = () => {
  const [submitBtnClick, setSubmitBtnClick] = useState(false);
  return (
    <>
      <Container>
        <FindEmailForm setSubmitBtnClick={setSubmitBtnClick} />
      </Container>
      {submitBtnClick && <Recaptcha />}
    </>
  );
};

export default FindEmailPage;
