import { useFormik } from "formik";
import {
  Container,
  ErrorMessage,
  Form,
  Input,
  LogoContainer,
  SelfAuthenticationLine,
} from "./RegisterForm.style";
import { MAIN_COLOR, SUB_COLOR } from "@utils/constant";
import * as Yup from "yup";
import { HeaderContainer } from "@userContainer/Container.style";
import Header from "@userContainer/Header";
import Image from "next/image";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      checkPassword: "",
      birthday: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 확인 해 주세요")
        .required("필수 입력 란입니다."),
      name: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .required("필수 입력 란입니다."),
      password: Yup.string()
        .required("필수 입력 란입니다.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "비밀번호는 소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
      checkPassword: Yup.string()
        .required("필수 입력 란입니다.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "비밀번호는 소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
      birthday: Yup.string().required("필수 입력 란입니다."),
      phoneNumber: Yup.number().required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container $bgColor={MAIN_COLOR}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <LogoContainer>
        <Image
          src="/images/logo.png"
          alt="wondering-pill-logo"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </LogoContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="이메일"
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}

        <Input
          id="name"
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="이름"
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}

        <Input
          id="password"
          type="text"
          {...formik.getFieldProps("password")}
          placeholder="비밀번호"
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}

        <Input
          id="checkPassword"
          type="text"
          {...formik.getFieldProps("checkPassword")}
          placeholder="비밀번호 확인"
        />
        {formik.touched.checkPassword && formik.errors.checkPassword ? (
          <ErrorMessage>{formik.errors.checkPassword}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}

        <Input
          id="birthday"
          type="text"
          {...formik.getFieldProps("birthday")}
          placeholder="생년월일"
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}

        <SelfAuthenticationLine $lineColor={SUB_COLOR}>
          본인 인증
        </SelfAuthenticationLine>

        <button type="submit">Submit</button>
      </Form>
      <Form>
        <Input
          id="birthday"
          type="text"
          {...formik.getFieldProps("birthday")}
          placeholder="생년월일"
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}
        <Input
          id="birthday"
          type="text"
          {...formik.getFieldProps("birthday")}
          placeholder="생년월일"
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : (
          <ErrorMessage></ErrorMessage>
        )}
      </Form>
    </Container>
  );
};

export default RegisterForm;
