import { useFormik } from "formik";
import * as Yup from "yup";
import { BUTTON_COLOR, ERROR_MSG_COLOR } from "@utils/constant";
import {
  Form,
  ContentContainer,
  InputContainer,
  Input,
  ErrorMessage,
  SubmitBtn,
} from "./FindEmailForm.style";

interface FindEmailValues {
  name: string;
  birth: string;
  firstPhoneNum: string;
  middlePhoneNum: string;
  lastPhoneNum: string;
}

function FindEmailForm() {
  return (
    <Form>
      <ContentContainer>
        <InputContainer>
          <Input id="name" name="name" type="text" placeholder="이름" />
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>TEST</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Input
            id="birth"
            name="birth"
            type="text"
            placeholder="생년월일(8자리)"
          />
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>TEST</ErrorMessage>
        </InputContainer>
      </ContentContainer>

      <SubmitBtn $btnColor={BUTTON_COLOR}>계정 찾기</SubmitBtn>
    </Form>
  );
}

export default FindEmailForm;
