import { MAIN_COLOR, ACCENT_COLOR } from "@utils/constant";
import {
  FormContainer,
  TitleContainer,
  Title,
  InputContainer,
  Input,
  SubmitBtn,
  RetryBtnContainer,
  RetryMessage,
  RetryBtn,
  CloseBtnContainer,
  CloseBtn,
} from "./AuthForm.style";

interface AuthFormProps {
  onClose: () => void;
}

function AuthForm({ onClose }: AuthFormProps) {
  return (
    <FormContainer>
      <TitleContainer>
        <Title $txtColor={ACCENT_COLOR}>인증번호 입력</Title>
      </TitleContainer>

      <InputContainer>
        <Input type="text" name="authNum" placeholder="인증번호" />
        <SubmitBtn type="button" $btnColor={MAIN_COLOR}>
          확인
        </SubmitBtn>
      </InputContainer>

      <RetryBtnContainer>
        <RetryMessage>인증번호가 발송되지 않았나요?</RetryMessage>
        <RetryBtn $btnColor={ACCENT_COLOR}>다시 인증번호 요청</RetryBtn>
      </RetryBtnContainer>

      <CloseBtnContainer>
        <CloseBtn type="button" onClick={onClose}>
          닫기
        </CloseBtn>
      </CloseBtnContainer>
    </FormContainer>
  );
}

export default AuthForm;
