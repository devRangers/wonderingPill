import { useState, useCallback, useEffect } from "react";
import { ButtonValue } from "@searchComp/option/Option";
import { changeStateWithQuery } from "@searchComp/option/MainContainer";

function useShapeButtons(shape: string) {
  const [shapeButtons, setShapeButtons] = useState<{
    [key in string]: ButtonValue;
  }>({
    circle: {
      name: "원형",
      isSelected: false,
    },
    oval: {
      name: "타원형",
      isSelected: false,
    },
    hexagon: {
      name: "육각형",
      isSelected: false,
    },
    oblong: {
      name: "장방형",
      isSelected: false,
    },
    pentagon: {
      name: "오각형",
      isSelected: false,
    },
    rectangle: {
      name: "장방형",
      isSelected: false,
    },
    triangle: {
      name: "삼각형",
      isSelected: false,
    },
    rhombus: {
      name: "마름모형",
      isSelected: false,
    },
    etc: {
      name: "기타",
      isSelected: false,
    },
  });

  const handleSetShapeButtons = useCallback((key: string) => {
    setShapeButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  useEffect(() => {
    setShapeButtons(changeStateWithQuery(shapeButtons, shape));
  }, []);

  return {
    shapeButtons,
    handleSetShapeButtons,
  };
}

export default useShapeButtons;
