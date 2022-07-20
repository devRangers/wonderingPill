import { useState, useEffect, useCallback } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

function Recaptcha() {
  const [token, setToken] = useState("");

  const verifyToken = useCallback((data: string) => {
    setToken(data);
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lel-wQhAAAAAB55a0ZHQoZNaBT68ZMVMyPGJP_X">
      <GoogleReCaptcha onVerify={verifyToken} />
    </GoogleReCaptchaProvider>
  );
}

export default Recaptcha;
