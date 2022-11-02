export interface ButtonValue {
  name: string;
  isSelected: boolean;
}

export const ShapeButtons: { [key in string]: ButtonValue } = {
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
};
export const ColorButtons: { [key in string]: ButtonValue } = {
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
};

export const PatternButtons: { [key in string]: ButtonValue } = {
  pattern: {
    name: "있음",
    isSelected: false,
  },
  noPattern: {
    name: "없음",
    isSelected: true,
  },
};

export const changeStateWithQuery = (
  buttons: { [key in string]: ButtonValue },
  queries: string | string[] | undefined,
) => {
  if (typeof queries == "string") {
    buttons[queries].isSelected = true;
  } else {
    queries?.forEach((query) => {
      return Object.entries(buttons).map(
        ([key, value], index) => (buttons[query].isSelected = true),
      );
    });
  }
  return { ...buttons };
};

export const SHAPE = "체형";
export const COLOR = "색상";
export const PATTERN = "문양";
