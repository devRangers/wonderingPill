import { useState } from "react";
import { SEMI_ACCENT_COLOR, GRAY_COLOR } from "@utils/constant";
import { FormContainer, FormTitle, Form } from "./SetNotificationPage.style";
import Switch from "./Switch";

interface RemindFormProps {
  disabled: boolean;
}

function RemindForm({ disabled }: RemindFormProps) {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <FormContainer>
      <FormTitle
        $txtColor={disabled || !isToggle ? GRAY_COLOR : SEMI_ACCENT_COLOR}
        $remind>
        다시 알림{" "}
        <Switch
          disabled={disabled}
          isToggle={isToggle}
          setIsToggle={setIsToggle}
        />
      </FormTitle>
      <Form $height="60%"></Form>
    </FormContainer>
  );
}

export default RemindForm;
