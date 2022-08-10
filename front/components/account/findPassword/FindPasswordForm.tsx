import { useRef } from "react";
import { BUTTON_COLOR } from "@utils/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputContainer,
  Input,
  SubmitBtn as FindBtn,
} from "@userContainer/Container.style";
import { ErrorMessage, Form } from "./FindPasswordForm.style";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "react-query";

interface FindPasswordFormValues {
  email: string;
  name: string;
  birth: string;
}

const findPasswordFormInitialValue: FindPasswordFormValues = {
  email: "",
  name: "",
  birth: "",
};
type AuthEmail = FindPasswordFormValues & {
  token: string;
};

const postAuthEmail = async (data: AuthEmail) => {
  console.log("post: ", data);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  const result = await res.json();
  if (result.statusCode >= 400) {
    throw new Error(result.message);
  }
  return result;
};

function FindPasswordForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const mutation = useMutation(postAuthEmail, {
    onSuccess: (data) => {
      console.log("mutation data: ", data);
    },
    onError: (data) => {},
  });

  const findPasswordFormik = useFormik({
    initialValues: findPasswordFormInitialValue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 확인 해 주세요")
        .required("필수 입력 란입니다."),
      name: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .required("필수 입력 란입니다."),
      birth: Yup.string()
        .matches(
          /(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
          "생년월일을 확인해주세요.",
        )
        .required("필수 입력 란입니다."),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      console.log(typeof values.birth);

      const dataToSubmit: AuthEmail = Object.assign(values, {
        token,
      });
      recaptchaRef.current?.reset();
      mutation.mutate(dataToSubmit);
    },
  });
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}>
      <Form onSubmit={findPasswordFormik.handleSubmit}>
        <InputContainer>
          <Input
            id="email"
            type="email"
            {...findPasswordFormik.getFieldProps("email")}
            placeholder="이메일"
          />
          {findPasswordFormik.touched.email &&
          findPasswordFormik.errors.email ? (
            <ErrorMessage>{findPasswordFormik.errors.email}</ErrorMessage>
          ) : (
            <ErrorMessage />
          )}
        </InputContainer>
        <InputContainer>
          <Input
            id="email"
            type="text"
            {...findPasswordFormik.getFieldProps("name")}
            placeholder="이름"
          />
          {findPasswordFormik.touched.name && findPasswordFormik.errors.name ? (
            <ErrorMessage>{findPasswordFormik.errors.name}</ErrorMessage>
          ) : (
            <ErrorMessage />
          )}
        </InputContainer>
        <InputContainer>
          <Input
            id="birth"
            type="text"
            maxLength={8}
            inputMode="numeric"
            {...findPasswordFormik.getFieldProps("birth")}
            placeholder="생년월일"
          />
          {findPasswordFormik.touched.birth &&
          findPasswordFormik.errors.birth ? (
            <ErrorMessage>{findPasswordFormik.errors.birth}</ErrorMessage>
          ) : (
            <ErrorMessage />
          )}
        </InputContainer>
        <FindBtn type="submit" $btnColor={BUTTON_COLOR}>
          비밀번호 찾기
        </FindBtn>
      </Form>
    </ReCAPTCHA>
  );
}

export default FindPasswordForm;
