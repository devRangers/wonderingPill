import { useFormik } from "formik";
import * as Yup from "yup";
import { BUTTON_COLOR, ERROR_MSG_COLOR, SUB_COLOR } from "@utils/constant";
import {
  InputContainer,
  Input,
  ErrorMessage,
  SubmitBtn,
} from "@userContainer/Container.style";
import {
  Form,
  PhoneTitle,
  PhoneContainer,
  PhoneNumberContainer,
  PhoneNumberSelect,
  PhoneNumberInput,
  Hyphen,
  BtnContainer,
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
      <div>
        <InputContainer>
          <Input id="name" name="name" type="text" placeholder="이름" />
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>TEST</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Input
            id="birth"
            name="birth"
            type="number"
            placeholder="생년월일(8자리)"
          />
          <ErrorMessage $txtColor={ERROR_MSG_COLOR}>TEST</ErrorMessage>
        </InputContainer>
      </div>
      <PhoneContainer>
        <PhoneTitle $txtColor={SUB_COLOR}>휴대폰 번호</PhoneTitle>
        <PhoneNumberContainer>
          <PhoneNumberSelect name="firstPhoneNum" id="firstPhoneNum">
            <option value="010">010</option>
            <option value="070">070</option>
          </PhoneNumberSelect>
          <Hyphen $txtColor={SUB_COLOR}>―</Hyphen>
          <PhoneNumberInput
            id="middlePhoneNum"
            name="middlePhoneNum"
            type="number"
          />
          <Hyphen $txtColor={SUB_COLOR}>―</Hyphen>
          <PhoneNumberInput
            id="lastPhoneNum"
            name="lastPhoneNum"
            type="number"
          />
        </PhoneNumberContainer>
      </PhoneContainer>
      <BtnContainer>
        <SubmitBtn $btnColor={BUTTON_COLOR}>계정 찾기</SubmitBtn>
      </BtnContainer>
    </Form>
  );
}

export default FindEmailForm;
