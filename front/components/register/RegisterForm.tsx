import { useFormik } from "formik";
import {
  AuthenticationForm,
  AuthenticationInput,
  Container,
  ErrorMessage,
  Form,
  Input,
  LogoContainer,
  PhoneNumberContainer,
  SelfAuthenticationLine,
  SubmitPhoneNumber,
} from "./RegisterForm.style";
import { MAIN_COLOR, SUB_COLOR } from "@utils/constant";
import * as Yup from "yup";
import { HeaderContainer } from "@userContainer/Container.style";
import Header from "@userContainer/Header";
import Image from "next/image";

const RegisterForm = () => {
  const userDataFormik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      checkPassword: "",
      birthday: "",
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
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
      checkPassword: Yup.string()
        .required("필수 입력 란입니다.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
      birthday: Yup.string().required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const phoneNumberFormik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.number().required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const authenticationFormik = useFormik({
    initialValues: {
      authenticationNumber: "",
    },
    validationSchema: Yup.object({
      authenticationNumber: Yup.string().required("필수 입력 란입니다."),
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
          src="/images/register_logo.png"
          alt="wondering-pill-logo"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </LogoContainer>
      <Form onSubmit={userDataFormik.handleSubmit}>
        <Input
          id="email"
          type="email"
          {...userDataFormik.getFieldProps("email")}
          placeholder="이메일"
        />
        {userDataFormik.touched.email && userDataFormik.errors.email ? (
          <ErrorMessage>{userDataFormik.errors.email}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="name"
          type="text"
          {...userDataFormik.getFieldProps("name")}
          placeholder="이름"
        />
        {userDataFormik.touched.name && userDataFormik.errors.name ? (
          <ErrorMessage>{userDataFormik.errors.name}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="password"
          type="text"
          {...userDataFormik.getFieldProps("password")}
          placeholder="비밀번호"
        />
        {userDataFormik.touched.password && userDataFormik.errors.password ? (
          <ErrorMessage>{userDataFormik.errors.password}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="checkPassword"
          type="text"
          {...userDataFormik.getFieldProps("checkPassword")}
          placeholder="비밀번호 확인"
        />
        {userDataFormik.touched.checkPassword &&
        userDataFormik.errors.checkPassword ? (
          <ErrorMessage>{userDataFormik.errors.checkPassword}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="birthday"
          type="text"
          {...userDataFormik.getFieldProps("birthday")}
          placeholder="생년월일(8자리)"
        />
        {userDataFormik.touched.birthday && userDataFormik.errors.birthday ? (
          <ErrorMessage>{userDataFormik.errors.birthday}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <SelfAuthenticationLine $lineColor={SUB_COLOR}>
          본인 인증
        </SelfAuthenticationLine>

        <button type="submit">Submit</button>
      </Form>
      <AuthenticationForm onSubmit={phoneNumberFormik.handleSubmit}>
        <PhoneNumberContainer>
          <AuthenticationInput
            id="phoneNumber"
            type="number"
            {...phoneNumberFormik.getFieldProps("phoneNumber")}
            placeholder="- 제외 휴대폰번호"
          />
          <SubmitPhoneNumber type="submit">전송</SubmitPhoneNumber>
        </PhoneNumberContainer>
        {phoneNumberFormik.touched.phoneNumber &&
        phoneNumberFormik.errors.phoneNumber ? (
          <ErrorMessage>{phoneNumberFormik.errors.phoneNumber}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}
      </AuthenticationForm>

      <AuthenticationForm onSubmit={authenticationFormik.handleSubmit}>
        <PhoneNumberContainer>
          <AuthenticationInput
            id="authenticationNumber"
            type="number"
            {...authenticationFormik.getFieldProps("authenticationNumber")}
            placeholder="인증번호"
          />
          <SubmitPhoneNumber type="submit">확인</SubmitPhoneNumber>
        </PhoneNumberContainer>
        {authenticationFormik.touched.authenticationNumber &&
        authenticationFormik.errors.authenticationNumber ? (
          <ErrorMessage>
            {authenticationFormik.errors.authenticationNumber}
          </ErrorMessage>
        ) : (
          <ErrorMessage />
        )}
      </AuthenticationForm>
    </Container>
  );
};

export default RegisterForm;
