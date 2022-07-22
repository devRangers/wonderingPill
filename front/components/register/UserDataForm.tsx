import Modal from "@modal/Modal";
import { BUTTON_COLOR, SUB_COLOR } from "@utils/constant";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { ApplySubmitValues } from "./RegisterForm";
import {
  ErrorMessage,
  Form,
  Input,
  Mark,
  NoticeCheckPhoneNumberBody,
  NoticeCheckPhoneNumberModal,
  SelfAuthenticationLine,
  SubmitButton,
} from "./RegisterForm.style";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { UserEntity } from "@modelTypes/userEntity";

interface UserDataFormProps {
  applySubmit: ApplySubmitValues;
}

interface RegisterValues {
  email: string;
  name: string;
  password: string;
  checkPassword: string;
  birth: string;
}

interface ModalValue {
  content: string;
}

const userInitialValue: RegisterValues = {
  email: "",
  name: "",
  password: "",
  checkPassword: "",
  birth: "",
};

type PostUserData = Omit<RegisterValues, "checkPassword">;

const postRegisterAPI = async (data: PostUserData) => {
  const res = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.statusCode >= 400) {
    throw new Error(result.message);
  }
  return result;
};

const modalText: { [key in string]: ModalValue } = {
  selfAuthModal: {
    content: "본인 인증을 진행해주세요.",
  },
  agreementModal: {
    content: "동의사항을 확인해주세요.",
  },
};

function UserDataForm({ applySubmit }: UserDataFormProps) {
  const [openModal, setOpenModal] = useState([false, false]);
  const router = useRouter();

  const mutation = useMutation(postRegisterAPI, {
    onSuccess: (data, variables) => {
      router.push(
        {
          pathname: "/login",
          query: {
            email: data.email,
          },
        },
        "/login",
      );
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log("error: ", error);
      console.log("variables:", variables);
    },
  });

  const userDataFormik = useFormik({
    initialValues: userInitialValue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 확인 해 주세요")
        .required("필수 입력 란입니다."),
      name: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .required("필수 입력 란입니다."),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        )
        .max(20, "20자 이하로 입력 해 주세요.")
        .required("필수 입력 란입니다."),
      checkPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
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
      if (applySubmit.authSelf && applySubmit.checkAllBox) {
        const tempBirth = String(values.birth);
        const { checkPassword, ...dataToSubmit } = values;
        const newSubmitData = {
          ...dataToSubmit,
          birth: tempBirth,
          phone: applySubmit.phoneNumber,
        };
        mutation.mutate(newSubmitData);
      } else {
        if (!applySubmit.authSelf) {
          setOpenModal((cur) => {
            const temp = [...cur];
            temp[0] = !temp[0];
            return temp;
          });
        } else {
          setOpenModal((cur) => {
            const temp = [...cur];
            temp[1] = !temp[1];
            return temp;
          });
        }
      }
    },
  });

  const handleClickModalBackground = (index: number) => {
    setOpenModal((cur) => {
      const temp = [...cur];
      temp[index] = !temp[index];
      return temp;
    });
  };

  return (
    <>
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
          type="password"
          {...userDataFormik.getFieldProps("password")}
          placeholder="비밀번호"
          autoComplete="true"
        />
        {userDataFormik.touched.password && userDataFormik.errors.password ? (
          <ErrorMessage>{userDataFormik.errors.password}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="checkPassword"
          type="password"
          {...userDataFormik.getFieldProps("checkPassword")}
          placeholder="비밀번호 확인"
          autoComplete="true"
        />
        {userDataFormik.touched.checkPassword &&
        userDataFormik.errors.checkPassword ? (
          <ErrorMessage>{userDataFormik.errors.checkPassword}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <Input
          id="birth"
          type="text"
          maxLength={8}
          inputMode="numeric"
          {...userDataFormik.getFieldProps("birth")}
          placeholder="생년월일(8자리)"
        />
        {userDataFormik.touched.birth && userDataFormik.errors.birth ? (
          <ErrorMessage>{userDataFormik.errors.birth}</ErrorMessage>
        ) : (
          <ErrorMessage />
        )}

        <SelfAuthenticationLine $lineColor={SUB_COLOR}>
          본인 인증
        </SelfAuthenticationLine>

        <SubmitButton type="submit" $btnColor={BUTTON_COLOR}>
          회원 가입하기
        </SubmitButton>
      </Form>
      {Object.entries(modalText).map(([key, value], index) => (
        <Modal
          key={key}
          open={openModal[index]}
          onClose={() => handleClickModalBackground(index)}>
          <NoticeCheckPhoneNumberModal>
            <Mark $iconColor={SUB_COLOR}>
              <BsFillExclamationCircleFill />
            </Mark>
            <NoticeCheckPhoneNumberBody>
              {value.content}
            </NoticeCheckPhoneNumberBody>
          </NoticeCheckPhoneNumberModal>
        </Modal>
      ))}
    </>
  );
}

export default UserDataForm;
