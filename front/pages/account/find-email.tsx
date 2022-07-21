import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";

const FindEmailPage: NextPage = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [startVerification, setStartVerification] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      console.log(token);
      recaptchaRef?.current?.reset();
    };
    if (startVerification) {
      getToken();
      setStartVerification(false);
    }
  }, [startVerification]);

  return (
    <>
      <Container>
        <FindEmailForm setStartVerification={setStartVerification} />
      </Container>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}`}
          style={{ visibility: startVerification ? "visible" : "hidden" }}
        />
      </div>
    </>
  );
};

export default FindEmailPage;
