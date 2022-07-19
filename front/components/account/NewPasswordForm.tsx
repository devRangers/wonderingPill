import { BUTTON_COLOR, ERROR_MSG_COLOR } from "@utils/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputContainer,
  Input,
  SubmitBtn as ChangeBtn,
  ErrorMessage,
} from "@userContainer/Container.style";
import { Form } from "./FindPasswordForm.style";

interface NewPasswordValues {
  password: string;
  checkPassword: string;
}

const findPasswordInitialValue: NewPasswordValues = {
  password: "",
  checkPassword: "",
};

function NewPasswordForm() {
  const newPasswordFormik = useFormik({
    initialValues: findPasswordInitialValue,
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        )
        .required("필수 입력 란입니다."),
      checkPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form onSubmit={newPasswordFormik.handleSubmit}>
      <InputContainer>
        <Input
          id="password"
          type="password"
          {...newPasswordFormik.getFieldProps("password")}
          placeholder="새로운 비밀번호"
        />
        {newPasswordFormik.touched.password &&
        newPasswordFormik.errors.password ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {newPasswordFormik.errors.password}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}
      </InputContainer>
      <InputContainer>
        <Input
          id="checkPassword"
          type="password"
          {...newPasswordFormik.getFieldProps("checkPassword")}
          placeholder="비밀번호 확인"
        />
        {newPasswordFormik.touched.checkPassword &&
        newPasswordFormik.errors.checkPassword ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {newPasswordFormik.errors.checkPassword}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}
      </InputContainer>

      <ChangeBtn type="submit" $btnColor={BUTTON_COLOR}>
        비밀번호 변경
      </ChangeBtn>
    </Form>
  );
}

export default NewPasswordForm;
