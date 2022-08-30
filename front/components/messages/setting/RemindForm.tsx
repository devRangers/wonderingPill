import { useState } from "react";
import { SEMI_ACCENT_COLOR, GRAY_COLOR } from "@utils/constant";
import {
  FormContainer,
  FormTitle,
  Form,
  FormContent,
  Input,
  Text,
} from "./SetNotificationPage.style";
import Switch from "./Switch";

interface RemindFormProps {
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function RemindForm({ disabled, onChange }: RemindFormProps) {
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
      <Form $height="60%">
        <FormContent>
          <Input
            type="number"
            name="repeatTime"
            min="1"
            disabled={disabled || !isToggle}
            onChange={onChange}
            $width="30%"
          />
          <Text
            $txtColor={disabled || !isToggle ? GRAY_COLOR : "#000"}
            $isRemindForm>
            분 후 다시 알림
          </Text>
        </FormContent>
      </Form>
    </FormContainer>
  );
}

export default RemindForm;
