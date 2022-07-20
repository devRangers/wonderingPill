import { BUTTON_COLOR } from "@utils/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputContainer,
  Input,
  SubmitBtn as FindBtn,
} from "@userContainer/Container.style";
import { ErrorMessage, Form } from "./FindPasswordForm.style";

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
        .matches(
          /(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
          "생년월일을 확인해주세요.",
        )
        .required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form onSubmit={findPasswordFormik.handleSubmit}>
      <InputContainer>
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
          type="number"
          {...findPasswordFormik.getFieldProps("birth")}
          placeholder="생년월일"
        />
        {findPasswordFormik.touched.birth && findPasswordFormik.errors.birth ? (
          <ErrorMessage>{findPasswordFormik.errors.birth}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}
      </InputContainer>
      <FindBtn type="submit" $btnColor={BUTTON_COLOR}>
        비밀번호 찾기
      </FindBtn>
    </Form>
  );
}

export default FindPasswordForm;
