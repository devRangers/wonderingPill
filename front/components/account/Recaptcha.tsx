import { useCallback, Dispatch, SetStateAction } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useMutation } from "react-query";

interface RecaptchaProps {
  startVerification: boolean;
  setStartVerification: Dispatch<SetStateAction<boolean>>;
  setSuccessVerification: Dispatch<SetStateAction<boolean>>;
}

const getRecaptchaResult = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RECAPTCHA_URL}?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    },
  );
  const result = await res.json();
  return result;
};

function Recaptcha({
  startVerification,
  setStartVerification,
  setSuccessVerification,
}: RecaptchaProps) {
  const recaptchaMutation = useMutation(getRecaptchaResult, {
    onSuccess: (data, variables) => {
      setStartVerification(false);
    },
  });

  const verifyToken = useCallback(
    (data: string) => {
      if (startVerification) {
        recaptchaMutation.mutate(data);
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
