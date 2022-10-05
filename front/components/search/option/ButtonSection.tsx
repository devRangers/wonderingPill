import { GRAY_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import React from "react";
import { ButtonValue } from "./optionData";
import {
  ButtonContainer,
  OptionButton,
  OptionContainer,
  OptionTitle,
} from "./Option.style";

interface ButtonSectionProps {
  title: string;
  buttons: { [key in string]: ButtonValue };
  isButtonSelected: boolean[];
  handleClickButtonSelect: (index: number) => void;
}

function ButtonSection({
  title,
  buttons,
  isButtonSelected,
  handleClickButtonSelect,
}: ButtonSectionProps) {
  return (
    <OptionContainer>
      <OptionTitle $color={SEMI_ACCENT_COLOR}>{title}</OptionTitle>
      <ButtonContainer>
        {Object.entries(buttons).map(([key, value], index) => (
          <OptionButton
            key={key}
            onClick={() => handleClickButtonSelect(index)}
            $bgColor={SEMI_ACCENT_COLOR}
            $isSelected={isButtonSelected[index]}
            $color={GRAY_COLOR}>
            {value.name}
          </OptionButton>
        ))}
      </ButtonContainer>
    </OptionContainer>
  );
}

export default ButtonSection;
