import { useEffect, useState } from "react";
import { SUB_COLOR } from "@utils/constant";
import {
  AuthenticationForm,
  AuthenticationInput,
  CheckBox,
  CheckboxContainer,
  CustomCheckmark,
  ErrorMessage,
  Label,
  LabelWrapper,
  ModalButton,
  ModalChildrenContainer,
  ModalContent,
  ModalTitle,
  PhoneNumberContainer,
  SubmitAuthenticationBtn,
} from "./RegisterForm.style";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@modal/Modal";

const ReSendTimer = 4000;

interface AuthenticationProps {
  handleSetApplySelfAuth: (phoneNumber: string) => void;
  handleSetApplyAllCheckBox: (checkAllBox: boolean) => void;
}

interface AuthSelfValues {
  authPhone: boolean;
  authNumberConfirm: boolean;
}

interface PhoneValues {
  phoneNumber: string;
}

interface AuthenticationValues {
  authenticationNumber: string;
}

interface ModalValue {
  title: string;
  content: string;
  close: string;
}

const phoneInitialValue: PhoneValues = {
  phoneNumber: "",
};
const authenticationInitialValue: AuthenticationValues = {
  authenticationNumber: "",
};

const labelData: { [key in string]: string } = {
  age: "만 14세 이상입니까?",
  privacy: "개인정보 취급방침 동의",
  "terms of service": "이용약관 동의",
  "location information": "위치정보 동의",
};

const modalText: { [key in string]: ModalValue } = {
  privacy: {
    title: "개인정보 취급방침 동의",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?",
    close: "확인",
  },
  "terms of service": {
    title: "이용약관 동의",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?",
    close: "확인",
  },
  "location information": {
    title: "위치정보 동의",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae alias magnam obcaecati expedita minima in vitae id laborum consectetur, accusantium rerum quia omnis recusandae, veniam odio labore! Deleniti, corrupti tempora?",
    close: "확인",
  },
};

function Authentication({
  handleSetApplySelfAuth,
  handleSetApplyAllCheckBox,
}: AuthenticationProps) {
  const [selectedCheckbox, setSelectedCheckbox] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [openModal, setOpenModal] = useState([false, false, false]);
  const [authSelf, setAuthSelf] = useState<AuthSelfValues>({
    authPhone: false,
    authNumberConfirm: false,
  });

  const handleClickCheckbox = (index: number) => {
    // 아직 동의하지 않았다면 모달을 띄운다.
    if (selectedCheckbox[index] === false) {
      setOpenModal((cur) => {
        const temp = [...cur];
        temp[index] = !temp[index];
        return temp;
      });
    }
    setSelectedCheckbox((cur) => {
      const temp = [...cur];
      temp[index] = !temp[index];
      return temp;
    });
  };

  const handleClickModalBack = (index: number) => {
    // 모달 바깥쪽을 클릭한다면 동의를 취소
    setSelectedCheckbox((cur) => {
      const temp = [...cur];
      temp[index] = !temp[index];
      return temp;
    });

    setOpenModal((cur) => {
      const temp = [...cur];
      temp[index] = !temp[index];
      return temp;
    });
  };

  const handleClickModalBtn = (index: number) => {
    setOpenModal((cur) => {
      const temp = [...cur];
      temp[index] = !temp[index];
      return temp;
    });
  };

  const phoneNumberFormik = useFormik({
    initialValues: phoneInitialValue,
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\d{3}\d{4}\d{4}$/, "유효하지 않은 번호입니다.")
        .required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      const number: string =
        phoneNumberFormik.getFieldProps("phoneNumber").value;
      if (number.length === 0) {
        return;
      }
      setAuthSelf((cur) => {
        return {
          ...cur,
          authPhone: true,
          authNumberConfirm: false,
        };
      });

      alert(JSON.stringify(values, null, 2));
    },
  });

  const authenticationFormik = useFormik({
    initialValues: authenticationInitialValue,
    validationSchema: Yup.object({
      authenticationNumber: Yup.string().required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      handleSetApplySelfAuth(
        phoneNumberFormik.getFieldProps("phoneNumber").value,
      );
      console.log("asd");

      setAuthSelf((cur) => {
        return {
          ...cur,
          authNumberConfirm: true,
        };
      });
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const result = selectedCheckbox.find((check) => check === false);
    if (result === undefined) {
      handleSetApplyAllCheckBox(true);
    } else {
      handleSetApplyAllCheckBox(false);
    }
  }, [selectedCheckbox]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthSelf((cur) => {
        return {
          ...cur,
          authPhone: false,
        };
      });
    }, ReSendTimer);

    return () => {
      clearTimeout(timer);
    };
  }, [authSelf.authPhone]);

  return (
    <>
      <AuthenticationForm onSubmit={phoneNumberFormik.handleSubmit}>
        <PhoneNumberContainer>
          <AuthenticationInput
            id="phoneNumber"
            type="text"
            inputMode="tel"
            maxLength={11}
            {...phoneNumberFormik.getFieldProps("phoneNumber")}
            placeholder="- 제외 휴대폰번호"
          />
          <SubmitAuthenticationBtn
            type="submit"
            $btnColor={SUB_COLOR}
            $isDisabled={authSelf.authPhone}
            disabled={authSelf.authPhone ? true : false}>
            전송
          </SubmitAuthenticationBtn>
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
          <SubmitAuthenticationBtn
            type="submit"
            $btnColor={SUB_COLOR}
            $isDisabled={authSelf.authNumberConfirm}
            disabled={
              authenticationFormik.errors.authenticationNumber &&
              authSelf.authNumberConfirm
                ? true
                : false
            }>
            확인
          </SubmitAuthenticationBtn>
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
      <CheckboxContainer>
        {Object.entries(labelData).map(([key, value], index) => (
          <LabelWrapper key={key}>
            <Label htmlFor={key}>
              <CheckBox
                type="checkbox"
                id={key}
                name={key}
                onClick={() => handleClickCheckbox(index)}
              />
              <CustomCheckmark
                $checked={selectedCheckbox[index]}
                $markColor={SUB_COLOR}
              />
              {value}
            </Label>
          </LabelWrapper>
        ))}
      </CheckboxContainer>
      {Object.entries(modalText).map(([key, value], index) => (
        <Modal
          key={key}
          open={openModal[index + 1]}
          onClose={() => handleClickModalBack(index + 1)}>
          <ModalChildrenContainer>
            <ModalTitle $fontColor={SUB_COLOR}>{value.title}</ModalTitle>
            <ModalContent $scrollColor={SUB_COLOR}>
              {value.content}
            </ModalContent>
            <ModalButton onClick={() => handleClickModalBtn(index + 1)}>
              {value.close}
            </ModalButton>
          </ModalChildrenContainer>
        </Modal>
      ))}
    </>
  );
}

export default Authentication;
