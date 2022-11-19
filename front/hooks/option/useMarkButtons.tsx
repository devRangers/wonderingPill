import { useState, useCallback } from "react";
import { ButtonValue } from "@searchComp/option/MainContainer";

function useMarkButtons() {
  const [markButtons, setColorButtons] = useState<{
    [key in string]: ButtonValue;
  }>({
    mark: {
      name: "있음",
      isSelected: false,
    },
    noMark: {
      name: "없음",
      isSelected: true,
    },
  });

  const handleSetMarkButtons = useCallback((key: string) => {
    setColorButtons((cur) => {
      const curButtons = { ...cur };
      Object.entries(curButtons).forEach(
        ([key, _]) => (curButtons[key].isSelected = false),
      );
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  return {
    markButtons,
    handleSetMarkButtons,
  };
}

export default useMarkButtons;
