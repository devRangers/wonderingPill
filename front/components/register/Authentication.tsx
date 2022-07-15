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
  PhoneNumberContainer,
  SubmitAuthenticationBtn,
} from "./RegisterForm.style";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  return (
    <>
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
                onClick={() =>
                  setSelectedCheckbox((cur) => {
                    const temp = [...cur];
                    temp[index] = !temp[index];
                    return temp;
                  })
                }
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
