import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  setToken: Dispatch<SetStateAction<string>>;
}

function ReCaptcha({ setToken }: ReCaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      setToken(token);
      recaptchaRef.current?.reset();
    };
    getToken();
  }, []);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
    />
  );
}

export default ReCaptcha;
