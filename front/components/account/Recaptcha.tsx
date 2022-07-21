import { useCallback } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useMutation } from "react-query";

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

function Recaptcha() {
  const recaptchaMutation = useMutation(getRecaptchaResult, {
    onSuccess: (data, variables) => {
      console.log(data);
    },
  });

  const verifyToken = useCallback((data: string) => {
    recaptchaMutation.mutate(data);
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}>
      <GoogleReCaptcha onVerify={verifyToken} />
    </GoogleReCaptchaProvider>
  );
}

export default Recaptcha;
