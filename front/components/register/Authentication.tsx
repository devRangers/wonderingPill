import { useState } from "react";
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

interface PhoneValues {
  phoneNumber: string;
}

interface AuthenticationValues {
  authenticationNumber: string;
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

function Authentication() {
  const [selectedCheckbox, setSelectedCheckbox] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [openModal, setOpenModal] = useState([false, false, false]);

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
      phoneNumber: Yup.string().matches(
        /^[0-9]{11}$/,
        "유효하지 않은 번호입니다.",
      ),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const authenticationFormik = useFormik({
    initialValues: authenticationInitialValue,
    validationSchema: Yup.object({
      authenticationNumber: Yup.string().required("필수 입력 란입니다."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  interface ModalProps {
    title: string;
    content: string;
    close: string;
  }
  const modalText: { [key in string]: ModalProps } = {
    privacy: {
      title: "개인정보 취급방침 동의",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁ",
      close: "확인",
    },
    "terms of service": {
      title: "이용약관 동의",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁ",
      close: "확인",
    },
    "location information": {
      title: "위치정보 동의",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadadjkㅁㄴㅇㅁ넝ㅁ어만엄ㄴ엄암ㄴㅇㅁ",
      close: "확인",
    },
  };

  return (
    <>
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
      <AuthenticationForm onSubmit={phoneNumberFormik.handleSubmit}>
        <PhoneNumberContainer>
          <AuthenticationInput
            id="phoneNumber"
            type="number"
            {...phoneNumberFormik.getFieldProps("phoneNumber")}
            placeholder="- 제외 휴대폰번호"
          />
          <SubmitAuthenticationBtn type="submit" $btnColor={SUB_COLOR}>
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
          <SubmitAuthenticationBtn type="submit" $btnColor={SUB_COLOR}>
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
    </>
  );
}

export default Authentication;
