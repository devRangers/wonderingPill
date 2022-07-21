import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  startVerification: boolean;
  setStartVerification: Dispatch<SetStateAction<boolean>>;
}

function ReCaptcha({
  startVerification,
  setStartVerification,
}: ReCaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}`}
    />
  );
}

export default ReCaptcha;
