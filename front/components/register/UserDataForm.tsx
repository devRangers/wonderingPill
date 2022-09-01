import { useState } from "react";
import { useRouter } from "next/router";
import {
  ACCENT_COLOR,
  SUB_COLOR,
  ERROR_MSG_COLOR,
  GRAY_COLOR,
} from "@utils/constant";
import { BsFillExclamationCircleFill } from "react-icons/bs";
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
import { ApplySubmitValues } from "./RegisterForm";
import { CreateUserResponse } from "@modelTypes/createUserResponse";
import Modal from "@modal/Modal";
import * as Api from "@api";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import ReactTooltip from "react-tooltip";

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

interface PostSubmitData {
  birth: string;
  phone: string;
  email: string;
  name: string;
  password: string;
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

const modalText: { [key in string]: ModalValue } = {
  selfAuthModal: {
    content: "본인 인증을 진행해주세요.",
  },
  agreementModal: {
    content: "동의사항을 확인해주세요.",
  },
  failModal: {
    content: "이미 존재하는 이메일입니다.",
  },
};

function UserDataForm({ applySubmit }: UserDataFormProps) {
  const [openModal, setOpenModal] = useState([false, false, false]);
  const router = useRouter();

  const mutation = useMutation(
    (data: PostUserData) =>
      Api.post<CreateUserResponse, PostUserData>("/auth/signup", data),
    {
      onSuccess: (data, variables) => {
        router.push(
          {
            pathname: "/login",
            query: {
              email: data.user.email,
            },
          },
          "/login",
        );
      },
      onError: (error, variables, context) => {
        // An error happened!
        setOpenModal((cur) => {
          const temp = [...cur];
          temp[2] = !temp[2];
          return temp;
        });
      },
    },
  );

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
        .required("소문자, 숫자, 특수문자 포함 8자 이상입니다."),
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
        const { checkPassword, ...dataToSubmit } = values;
        const newSubmitData: PostSubmitData = {
          ...dataToSubmit,
          birth: values.birth,
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
          inputMode="email"
          {...userDataFormik.getFieldProps("email")}
          placeholder="이메일"
          $placeholderColor={GRAY_COLOR}
        />
        {userDataFormik.touched.email && userDataFormik.errors.email ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {userDataFormik.errors.email}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}

        <Input
          id="name"
          type="text"
          {...userDataFormik.getFieldProps("name")}
          placeholder="이름"
          $placeholderColor={GRAY_COLOR}
        />
        {userDataFormik.touched.name && userDataFormik.errors.name ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {userDataFormik.errors.name}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}

        <Input
          id="password"
          type="password"
          {...userDataFormik.getFieldProps("password")}
          placeholder="비밀번호"
          autoComplete="true"
          data-tip="password-tooltip"
          data-for="password-tooltip"
          $placeholderColor={GRAY_COLOR}
        />
        {userDataFormik.touched.password && userDataFormik.errors.password ? (
          <>
            <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
              필수 입력 란입니다.
            </ErrorMessage>

            <ReactTooltip
              key="password-tooltip"
              id="password-tooltip"
              place="top">
              {userDataFormik.errors.password}
            </ReactTooltip>
          </>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}

        <Input
          id="checkPassword"
          type="password"
          {...userDataFormik.getFieldProps("checkPassword")}
          placeholder="비밀번호 확인"
          autoComplete="true"
          $placeholderColor={GRAY_COLOR}
        />
        {userDataFormik.touched.checkPassword &&
        userDataFormik.errors.checkPassword ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {userDataFormik.errors.checkPassword}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}

        <Input
          id="birth"
          type="text"
          maxLength={8}
          inputMode="numeric"
          {...userDataFormik.getFieldProps("birth")}
          placeholder="생년월일(8자리)"
          $placeholderColor={GRAY_COLOR}
        />
        {userDataFormik.touched.birth && userDataFormik.errors.birth ? (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>
            {userDataFormik.errors.birth}
          </ErrorMessage>
        ) : (
          <ErrorMessage $txtColor={ERROR_MSG_COLOR} />
        )}

        <SelfAuthenticationLine $lineColor={ACCENT_COLOR}>
          본인 인증
        </SelfAuthenticationLine>

        <SubmitButton type="submit" $btnColor={SUB_COLOR}>
          회원 가입하기
        </SubmitButton>
      </Form>
      {Object.entries(modalText).map(([key, value], index) => (
        <Modal
          key={key}
          open={openModal[index]}
          onClose={() => handleClickModalBackground(index)}>
          <NoticeCheckPhoneNumberModal>
            <Mark $iconColor={ACCENT_COLOR}>
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
