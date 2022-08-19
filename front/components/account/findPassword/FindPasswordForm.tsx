import { useRef, useState } from "react";
import Modal from "@modal/Modal";
import { post } from "@api";
import { SUB_COLOR } from "@utils/constant";
import {
  InputContainer,
  Input,
  SubmitBtn as FindBtn,
} from "@userContainer/Container.style";
import { ErrorMessage, Form, ModalInner } from "./FindPasswordForm.style";
import { FindPasswordResponse } from "@modelTypes/findPasswordResponse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import ReCAPTCHA from "react-google-recaptcha";

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

function FindPasswordForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const mutation = useMutation(
    (data: AuthEmail) =>
      post<FindPasswordResponse, AuthEmail>("/auth/send-email", data),
    {
      onSuccess: (data) => {
        setIsSuccessModalOpen(true);
      },
      onError: (error: any) => {
        setIsFailModalOpen(true);
        throw new Error(error);
      },
    },
  );

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
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      console.log("token", token);

      const dataToSubmit: AuthEmail = Object.assign(values, {
        token,
      });
      recaptchaRef.current?.reset();

      mutation.mutate(dataToSubmit);
    },
  });
  return (
    <>
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
            {findPasswordFormik.touched.name &&
            findPasswordFormik.errors.name ? (
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
          <FindBtn type="submit" $btnColor={SUB_COLOR}>
            비밀번호 찾기
          </FindBtn>
        </Form>
      </ReCAPTCHA>
      {isSuccessModalOpen && (
        <Modal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}>
          <ModalInner>
            이메일이 전송 되었습니다. 이메일을 확인 해 주세요.
          </ModalInner>
        </Modal>
      )}
      {isFailModalOpen && (
        <Modal open={isFailModalOpen} onClose={() => setIsFailModalOpen(false)}>
          <ModalInner>입력 정보를 다시 확인 해 주세요.</ModalInner>
        </Modal>
      )}
    </>
  );
}

export default FindPasswordForm;
