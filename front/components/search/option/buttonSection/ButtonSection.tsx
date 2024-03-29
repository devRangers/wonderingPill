import React, { memo } from "react";
import { GRAY_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import {
  ButtonContainer,
  OptionButton,
  OptionContainer,
  OptionTitle,
} from "@searchOptionComp/Option.style";
import { ButtonValue } from "../MainContainer";

interface ButtonSectionProps {
  title: string;
  buttons: { [key in string]: ButtonValue };
  handleSetButtons: (key: string) => void;
}

function ButtonSection({
  title,
  buttons,
  handleSetButtons,
}: ButtonSectionProps) {
  const handleClickButtonSelect = (key: string) => {
    handleSetButtons(key);
  };

  return (
    <OptionContainer>
      <OptionTitle $color={SEMI_ACCENT_COLOR}>{title}</OptionTitle>
      <ButtonContainer>
        {Object.entries(buttons).map(([key, value]) => (
          <OptionButton
            key={key}
            onClick={() => handleClickButtonSelect(key)}
            $bgColor={SEMI_ACCENT_COLOR}
            $isSelected={value.isSelected}
            $color={GRAY_COLOR}>
            {value.name}
          </OptionButton>
        ))}
      </ButtonContainer>
    </OptionContainer>
  );
}

export default memo(ButtonSection);
