import { SEMI_ACCENT_COLOR, GRAY_COLOR, SUB_COLOR } from "@utils/constant";
import { FormContainer, FormTitle, Form } from "./SetNotificationPage.style";

interface TimeFormProps {
  disabled: boolean;
}

function TimeForm({ disabled }: TimeFormProps) {
  return (
    <FormContainer>
      <FormTitle $txtColor={disabled ? GRAY_COLOR : SEMI_ACCENT_COLOR}>
        시간 설정
      </FormTitle>
      <Form $height="90%"></Form>
    </FormContainer>
  );
}

export default TimeForm;
