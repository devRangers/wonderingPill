import Image from "next/image";
import {
  Form,
  SnsLoginContainer,
  SnsTitle,
  SnsBtnContainer,
  KakaoBtn,
  GoogleBtn,
} from "./LoginForm.style";

function LoginForm() {
  return (
    <>
      <Form>LoginForm</Form>

      <SnsLoginContainer>
        <SnsTitle>간편로그인</SnsTitle>
        <SnsBtnContainer>
          <KakaoBtn>
            <Image
              src="/images/sns/kakao.png"
              alt="kakao-login"
              width="45"
              height="45"
            />
          </KakaoBtn>

          <GoogleBtn>
            <Image
              src="/images/sns/google.png"
              alt="google-login"
              width="25"
              height="25"
            />
          </GoogleBtn>
        </SnsBtnContainer>
      </SnsLoginContainer>
    </>
  );
}

export default LoginForm;
