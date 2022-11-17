import { useCallback, useEffect } from "react";
import { MAIN_COLOR } from "@utils/constant";
import { MainContent } from "./Option.style";
import useShapeButtons from "@hooks/option/useShapeButtons";
import useColorButtons from "@hooks/option/useColorButtons";
import useMarkButtons from "@hooks/option/useMarkButtons";
import ButtonSection from "./buttonSection/ButtonSection";
import Form from "./form/OptionForm";
import { ButtonValue } from "./Option";

export const SHAPE = "체형";
export const COLOR = "색상";
export const MARK = "문양";
const KEY = "0";

interface MainContainerProps {
  shape: string;
  letters: string;
  colors: string | string[];
}

export const changeStateWithQuery = (
  buttons: { [key in string]: ButtonValue },
  queries: string | string[] | undefined,
) => {
  const curButtons = { ...buttons };
  if (typeof queries === "string") {
    curButtons[queries].isSelected = !curButtons[queries].isSelected;
  } else {
    Object.entries(curButtons).map(([key, _]) => {
      if (queries?.includes(key)) {
        curButtons[key].isSelected = !curButtons[key].isSelected;
      }
    });
  }
  return curButtons;
};

function MainContainer({ shape, letters, colors }: MainContainerProps) {
  const { shapeButtons, handleSetShapeButtons } = useShapeButtons(shape);
  const { colorButtons, handleSetColorButtons } = useColorButtons(colors);
  const { markButtons, handleSetMarkButtons } = useMarkButtons();

  const setSelectedButtons = useCallback(
    (buttons: { [key in string]: ButtonValue }) => {
      return Object.entries(buttons)
        .filter(([_, value]) => value.isSelected === true)
        .map((value, _) => value[KEY]);
    },
    [],
  );

  return (
    <MainContent $borderColor={MAIN_COLOR}>
      <ButtonSection
        title={SHAPE}
        buttons={shapeButtons}
        handleSetButtons={handleSetShapeButtons}
      />
      <ButtonSection
        title={COLOR}
        buttons={colorButtons}
        handleSetButtons={handleSetColorButtons}
      />
      <ButtonSection
        title={MARK}
        buttons={markButtons}
        handleSetButtons={handleSetMarkButtons}
      />
      <Form
        shape={setSelectedButtons(shapeButtons)}
        colors={setSelectedButtons(colorButtons)}
        mark={markButtons["mark"].isSelected ? "1" : "0"}
        letters={letters}
      />
    </MainContent>
  );
}

export default MainContainer;
