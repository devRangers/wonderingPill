import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "react-query";
import * as Api from "@api";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";
import { FindAccountDto as FindAccountValues } from "@modelTypes/findAccountDto";
import { AUTH } from "@utils/endpoint";
import {
  ERROR_MSG_COLOR,
  SUB_COLOR,
  ACCENT_COLOR,
  GRAY_COLOR,
} from "@utils/constant";
import {
  InputContainer,
  Input,
  ErrorMessage,
  SubmitBtn,
} from "@userContainer/Container.style";
import {
  Form,
  PhoneTitle,
  PhoneContainer,
  PhoneNumberContainer,
  PhoneNumberSelect,
  PhoneNumberInput,
  Hyphen,
  BtnContainer,
} from "./FindEmailForm.style";
import Modal from "@modal/Modal";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";

interface FindEmailValues {
  name: string;
  birth: string;
  firstPhoneNum: string;
  middlePhoneNum: string;
  lastPhoneNum: string;
}

const initialValue: FindEmailValues = {
  name: "",
  birth: "",
  firstPhoneNum: "010",
  middlePhoneNum: "",
  lastPhoneNum: "",
};

function FindEmailForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [phone, setPhone] = useState("");

  const findEmailMutation = useMutation(
    (data: FindAccountValues) =>
      Api.post<FindAccountResponse, FindAccountValues>(AUTH.SEND_SMS, data),
    {
      onSuccess: () => {
        setAuthModalOpen(true);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    },
  );

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .required("필수 입력 란입니다."),
      birth: Yup.string()
        .matches(
          /(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
          "생년월일을 확인해주세요.",
        )
        .required("필수 입력 란입니다."),
      firstPhoneNum: Yup.string().matches(/(010|070)/),
      middlePhoneNum: Yup.string()
        .matches(/^[0-9]{4}$/, "유효하지 않은 번호입니다.")
        .required("휴대폰 번호를 입력해 주세요."),
      lastPhoneNum: Yup.string()
        .matches(/^[0-9]{4}$/, "유효하지 않은 번호입니다.")
        .required("휴대폰 번호를 입력해 주세요."),
    }),
    onSubmit: async ({
      name,
      birth,
      firstPhoneNum,
      middlePhoneNum,
      lastPhoneNum,
    }) => {
      const token = (await recaptchaRef?.current?.executeAsync()) as string;
      const phoneNumber = firstPhoneNum + middlePhoneNum + lastPhoneNum;

      const dataToSubmit = {
        name,
        birth,
        token,
        phone: phoneNumber,
      };

      setPhone(phoneNumber);
      recaptchaRef.current?.reset();
      setAuthModalOpen(true);
      findEmailMutation.mutate(dataToSubmit);
    },
  });

  const modalCloseHandler = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <InputContainer>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="이름"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              $placeholderColor={GRAY_COLOR}
            />
            <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
              {formik.touched.name && formik.errors.name}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <Input
              id="birth"
              name="birth"
              type="text"
              maxLength={8}
              inputMode="numeric"
              placeholder="생년월일(8자리)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birth}
              $placeholderColor={GRAY_COLOR}
            />
            <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
              {formik.touched.birth && formik.errors.birth}
            </ErrorMessage>
          </InputContainer>
        </div>

        <PhoneContainer>
          <PhoneTitle $txtColor={ACCENT_COLOR}>휴대폰 번호</PhoneTitle>

          <PhoneNumberContainer>
            <PhoneNumberSelect
              name="firstPhoneNum"
              id="firstPhoneNum"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstPhoneNum}>
              <option value="010">010</option>
              <option value="070">070</option>
            </PhoneNumberSelect>
            <Hyphen $txtColor={ACCENT_COLOR}>―</Hyphen>

            <PhoneNumberInput
              id="middlePhoneNum"
              name="middlePhoneNum"
              type="text"
              maxLength={4}
              inputMode="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.middlePhoneNum}
            />
            <Hyphen $txtColor={ACCENT_COLOR}>―</Hyphen>

            <PhoneNumberInput
              id="lastPhoneNum"
              name="lastPhoneNum"
              type="text"
              maxLength={4}
              inputMode="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastPhoneNum}
            />
          </PhoneNumberContainer>
        </PhoneContainer>

        <BtnContainer>
          <SubmitBtn type="submit" $btnColor={SUB_COLOR}>
            계정 찾기
          </SubmitBtn>
        </BtnContainer>

        {authModalOpen && (
          <Modal open={authModalOpen} onClose={modalCloseHandler}>
            <AuthForm onClose={modalCloseHandler} phone={phone} />
          </Modal>
        )}
      </Form>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
    </>
  );
}

export default FindEmailForm;
