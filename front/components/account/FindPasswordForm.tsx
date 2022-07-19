import { BUTTON_COLOR } from "@utils/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage, FindBtn, Form, Input } from "./FindPasswordForm.style";

interface FindPasswordFormValues {
  email: string;
  name: string;
  birth: string;
}

const findPasswordFormInitialValue = {
  email: "",
  name: "",
  birth: "",
};

function FindPasswordForm() {
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
        .matches(/^[0-9]{8}$/, "생년월일 8글자를 입력하세요.")
        .required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form onSubmit={findPasswordFormik.handleSubmit}>
      <Input
        id="email"
        type="email"
        {...findPasswordFormik.getFieldProps("email")}
        placeholder="이메일"
      />
      {findPasswordFormik.touched.email && findPasswordFormik.errors.email ? (
        <ErrorMessage>{findPasswordFormik.errors.email}</ErrorMessage>
      ) : (
        <ErrorMessage />
      )}
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
      <Input
        id="birth"
        type="number"
        {...findPasswordFormik.getFieldProps("birth")}
        placeholder="생년월일"
      />
      {findPasswordFormik.touched.birth && findPasswordFormik.errors.birth ? (
        <ErrorMessage>{findPasswordFormik.errors.birth}</ErrorMessage>
      ) : (
        <ErrorMessage />
      )}
      <FindBtn type="submit" $bgColor={BUTTON_COLOR}>
        비밀번호 찾기
      </FindBtn>
    </Form>
  );
}

export default FindPasswordForm;
