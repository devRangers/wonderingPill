import { useState, useCallback, useEffect } from "react";
import { ButtonValue } from "@searchComp/option/Option";
import { changeStateWithQuery } from "@searchComp/option/MainContainer";

function useColorButtons(colors: string | string[]) {
  const [colorButtons, setColorButtons] = useState<{
    [key in string]: ButtonValue;
  }>({
    red: { name: "빨강", isSelected: false },
    orange: { name: "주황", isSelected: false },
    yellow: { name: "노랑", isSelected: false },
    green: { name: "초록", isSelected: false },
    blue: { name: "파랑", isSelected: false },
    purple: { name: "보라", isSelected: false },
    brown: { name: "갈색", isSelected: false },
    pink: { name: "분홍", isSelected: false },
    white: { name: "하양", isSelected: false },
    black: { name: "검정", isSelected: false },
    gray: { name: "회색", isSelected: false },
    transparent: { name: "투명", isSelected: false },
  });

  const handleSetColorButtons = useCallback((key: string) => {
    setColorButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  useEffect(() => {
    setColorButtons(changeStateWithQuery(colorButtons, colors));
  }, []);

  return {
    colorButtons,
    handleSetColorButtons,
  };
}

export default useColorButtons;
