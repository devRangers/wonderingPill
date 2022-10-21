import { Dispatch, SetStateAction } from "react";
import {
  SEMI_ACCENT_COLOR,
  GRAY_COLOR,
  LIGHT_GRAY_COLOR,
} from "@utils/constant";
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
  isRemindToggle: boolean;
  repeatTime: number;
  setIsRemindToggle: Dispatch<SetStateAction<boolean>>;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function RemindForm({
  disabled,
  isRemindToggle,
  repeatTime,
  setIsRemindToggle,
  onChange,
}: RemindFormProps) {
  return (
    <FormContainer>
      <FormTitle
        $txtColor={disabled || !isRemindToggle ? GRAY_COLOR : SEMI_ACCENT_COLOR}
        $remind>
        다시 알림{" "}
        <Switch
          disabled={disabled}
          isToggle={isRemindToggle}
          setIsToggle={setIsRemindToggle}
        />
      </FormTitle>
      <Form $height="60%" $bgColor={LIGHT_GRAY_COLOR}>
        <FormContent>
          <Input
            type="number"
            name="repeatTime"
            value={repeatTime}
            min="1"
            disabled={disabled || !isRemindToggle}
            onChange={onChange}
            $width="30%"
          />
          <Text
            $txtColor={disabled || !isRemindToggle ? GRAY_COLOR : "#000"}
            $isRemindForm>
            분 후 다시 알림
          </Text>
        </FormContent>
      </Form>
    </FormContainer>
  );
}

export default RemindForm;
