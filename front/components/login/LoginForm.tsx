import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BUTTON_COLOR, ERROR_MSG_COLOR, ROUTE } from "@utils/constant";
import {
  InputContainer,
  Input,
  ErrorMessage,
  SubmitBtn,
} from "@userContainer/Container.style";
import {
  LoginFormContainer,
  Form,
  ContentContainer,
  SubBtnContainer,
  CheckboxContainer,
  TextBtn,
  SnsLoginContainer,
  SnsTitle,
  SnsBtnContainer,
  KakaoBtn,
  GoogleBtn,
} from "./LoginForm.style";

interface LoginValues {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const userEmail = router.query?.email as string;

  const initialValue: LoginValues = {
    email: (userEmail as string) || "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 다시 확인해 주세요.")
        .required("이메일을 입력해 주세요."),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "비밀번호는 소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        )
        .required("비밀번호를 입력해 주세요."),
    }),
    onSubmit: async (values, actions) => {
      // Submit Handler 구현 예정
      console.log(values);
    },
  });

  return (
    <LoginFormContainer>
      <Form onSubmit={formik.handleSubmit}>
        <ContentContainer>
          <InputContainer>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="이메일"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
              {formik.touched.email && formik.errors.email}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
              {formik.touched.password && formik.errors.password}
            </ErrorMessage>
          </InputContainer>

          <SubmitBtn type="submit" $btnColor={BUTTON_COLOR}>
            로그인하기
          </SubmitBtn>
        </ContentContainer>
        <SubBtnContainer>
          <CheckboxContainer>
            <input type="checkbox" name="auto-login" id="auto-login" />
            <label htmlFor="auto-login">자동 로그인</label>
          </CheckboxContainer>
          <div>
            <TextBtn
              type="button"
              onClick={() => router.push(ROUTE.EMAIL_FIND.link)}>
              계정 찾기
            </TextBtn>
            /
            <TextBtn
              type="button"
              onClick={() => router.push(ROUTE.PASSWORD_FIND.link)}>
              비밀번호 찾기
            </TextBtn>
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
    </LoginFormContainer>
  );
}

export default LoginForm;
