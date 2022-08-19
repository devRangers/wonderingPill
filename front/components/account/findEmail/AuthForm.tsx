import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import * as Api from "@api";
import { FindUserResponse } from "@modelTypes/findUserResponse";
import { MAIN_COLOR, ACCENT_COLOR, ROUTE } from "@utils/constant";
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
  phone: string;
}

function AuthForm({ onClose, phone }: AuthFormProps) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // TODO: api 요청 시 phone, code 가리기
  useQuery(
    ["verifyCode", code],
    () =>
      Api.get<FindUserResponse>(
        `/auth/verify-code?phone=${phone}&code=${code}`,
      ),
    {
      enabled: !!code && isSubmitted,
      onSuccess: ({ user }) => {
        router.push({
          pathname: ROUTE.EMAIL_RESULT,
          query: { userId: user.id },
        });
      },
    },
  );

  return (
    <FormContainer>
      <TitleContainer>
        <Title $txtColor={ACCENT_COLOR}>인증번호 입력</Title>
      </TitleContainer>

      <InputContainer>
        <Input
          type="number"
          name="authNum"
          placeholder="인증번호"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
        <SubmitBtn
          type="button"
          $btnColor={MAIN_COLOR}
          $disabled={code.length === 0}
          onClick={() => setIsSubmitted(true)}
          disabled={code.length === 0}>
          확인
        </SubmitBtn>
      </InputContainer>

      <RetryBtnContainer>
        <RetryMessage>인증번호가 발송되지 않았나요?</RetryMessage>
        <RetryBtn type="submit" $btnColor={ACCENT_COLOR}>
          다시 인증번호 요청
        </RetryBtn>
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
