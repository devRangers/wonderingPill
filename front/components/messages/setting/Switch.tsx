import { Dispatch, SetStateAction } from "react";
import { SUB_COLOR } from "@utils/constant";
import { ToggleBtn, Ball } from "./Switch.style";

interface SwitchProps {
  disabled?: boolean;
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

function Switch({ disabled, isToggle, setIsToggle }: SwitchProps) {
  const toggleBtnClickHandler = () => {
    if (!disabled) {
      setIsToggle((cur) => !cur);
    }
  };

  return (
    <ToggleBtn
      type="button"
      onClick={toggleBtnClickHandler}
      disabled={disabled}>
      <Ball $bgColor={SUB_COLOR} $isToggle={isToggle} />
    </ToggleBtn>
  );
}

export default Switch;
