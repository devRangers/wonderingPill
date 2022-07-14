import Image from "next/image";
import { BUTTON_COLOR } from "@utils/constant";
import {
  Form,
  ContentContainer,
  Input,
  SubmitBtn,
  SubBtnContainer,
  CheckboxContainer,
  TextBtn,
  SnsLoginContainer,
  SnsTitle,
  SnsBtnContainer,
  KakaoBtn,
  GoogleBtn,
} from "./LoginForm.style";

function LoginForm() {
  return (
    <>
      <Form>
        <ContentContainer>
          <Input id="email" name="email" type="text" placeholder="이메일" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <SubmitBtn $btnColor={BUTTON_COLOR}>로그인하기</SubmitBtn>
        </ContentContainer>
        <SubBtnContainer>
          <CheckboxContainer>
            <input type="checkbox" name="auto-login" id="auto-login" />
            <label htmlFor="auto-login">자동 로그인</label>
          </CheckboxContainer>
          <div>
            <TextBtn>계정 찾기</TextBtn>/<TextBtn>비밀번호 찾기</TextBtn>
          </div>
        </SubBtnContainer>
      </Form>

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
