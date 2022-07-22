import { useCallback, Dispatch, SetStateAction } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

interface RecaptchaProps {
  startVerification: boolean;
  setToken: Dispatch<SetStateAction<string>>;
}

function Recaptcha({ startVerification, setToken }: RecaptchaProps) {
  const verifyToken = useCallback(
    (token: string) => {
      if (startVerification) {
        setToken(token);
      }
    },
    [startVerification],
  );

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}>
      <GoogleReCaptcha onVerify={verifyToken} />
    </GoogleReCaptchaProvider>
  );
}

export default Recaptcha;
