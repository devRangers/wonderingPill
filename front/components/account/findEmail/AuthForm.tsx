import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { MAIN_COLOR, ACCENT_COLOR, GRAY_COLOR, ROUTE } from "@utils/constant";
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

const verifyCode = async (phone: string, code: string) => {
  const res = await fetch("/api/verify-code", {
    method: "POST",
    body: JSON.stringify({ phone, code }),
  });
  const result = await res.json();
  return result;
};

function AuthForm({ onClose, phone }: AuthFormProps) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useQuery(["verifyCode", code], () => verifyCode(phone, code), {
    enabled: !!code && isSubmitted,
    retry: false,
    onSuccess: ({ user }) => {
      router.push({
        pathname: ROUTE.EMAIL_RESULT,
        query: { userId: user.id },
      });
    },
    onError: (err) => {
      console.log(err);
      setIsSubmitted(false);
    },
  });

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
          $borderColor={GRAY_COLOR}
        />
        <SubmitBtn
          type="button"
          $btnColor={code.length === 0 ? GRAY_COLOR : MAIN_COLOR}
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
        <CloseBtn type="button" onClick={onClose} $btnColor={GRAY_COLOR}>
          닫기
        </CloseBtn>
      </CloseBtnContainer>
    </FormContainer>
  );
}

export default AuthForm;
