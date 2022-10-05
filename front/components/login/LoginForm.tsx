import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactTooltip from "react-tooltip";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "react-query";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
import * as Api from "@api";
import { SigninResponse } from "@modelTypes/signinResponse";
import { SigninUserDto as LoginTypes } from "@modelTypes/signinUserDto";
import {
  SUB_COLOR,
  ERROR_MSG_COLOR,
  GRAY_COLOR,
  ROUTE,
  TOASTIFY,
} from "@utils/constant";
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
import { toast } from "react-toastify";

type LoginFormValues = Pick<LoginTypes, "email" | "password">;

function LoginForm() {
  const router = useRouter();
  const userEmail =
    router.query?.email && typeof router.query?.email === "string"
      ? router.query.email
      : "";

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [, setUser] = useAtom(userAtom);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);

  const nofityLoginFail = () => toast.error(TOASTIFY.LOGIN_FAIL);

  const initialValue: LoginFormValues = {
    email: userEmail,
    password: "",
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoLoginChecked(e.target.checked);
  };

  const loginMutation = useMutation(
    (data: LoginTypes) =>
      Api.post<SigninResponse, LoginTypes>("/auth/signin", data),
    {
      onSuccess: ({ user }) => {
        setUser(user);
        router.push(ROUTE.MAIN);
      },
      onError: ({ message }) => {
        console.log(message);
        nofityLoginFail();
      },
    },
  );

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 다시 확인해 주세요.")
        .required("이메일을 입력해 주세요."),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        )
        .required("소문자, 숫자, 특수문자 포함 8자 이상입니다."),
    }),
    onSubmit: async (values) => {
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      const dataToSubmit: LoginTypes = Object.assign(values, {
        isSignin: isAutoLoginChecked,
        token,
      });
      recaptchaRef.current?.reset();
      loginMutation.mutate(dataToSubmit);
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
              $placeholderColor={GRAY_COLOR}
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
              data-tip="password-tooltip"
              data-for="password-tooltip"
              autoComplete="true"
              $placeholderColor={GRAY_COLOR}
            />
            {formik.touched.password && formik.errors.password ? (
              <>
                <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
                  비밀번호를 입력해 주세요.
                </ErrorMessage>

                <ReactTooltip
                  key="password-tooltip"
                  id="password-tooltip"
                  place="top">
                  {formik.errors.password}
                </ReactTooltip>
              </>
            ) : (
              <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
            )}
          </InputContainer>

          <SubmitBtn type="submit" $btnColor={SUB_COLOR}>
            로그인하기
          </SubmitBtn>
        </ContentContainer>
        <SubBtnContainer>
          <CheckboxContainer>
            <input
              type="checkbox"
              name="auto-login"
              id="auto-login"
              checked={isAutoLoginChecked}
              onChange={checkboxHandler}
            />
            <label htmlFor="auto-login">자동 로그인</label>
          </CheckboxContainer>
          <div>
            <TextBtn
              type="button"
              onClick={() => router.push(ROUTE.EMAIL_FIND)}>
              계정 찾기
            </TextBtn>
            /
            <TextBtn
              type="button"
              onClick={() => router.push(ROUTE.PASSWORD_FIND)}>
              비밀번호 찾기
            </TextBtn>
          </div>
        </SubBtnContainer>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </Form>

      <SnsLoginContainer>
        <SnsTitle>간편로그인</SnsTitle>
        <SnsBtnContainer>
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao`}>
            <KakaoBtn>
              <Image
                src="/images/sns/kakao.png"
                alt="kakao-login"
                width="45"
                height="45"
              />
            </KakaoBtn>
          </Link>

          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}>
            <GoogleBtn>
              <Image
                src="/images/sns/google.png"
                alt="google-login"
                width="25"
                height="25"
              />
            </GoogleBtn>
          </Link>
        </SnsBtnContainer>
      </SnsLoginContainer>
    </LoginFormContainer>
  );
}

export default LoginForm;
