export interface ButtonValue {
  name: string;
}

export const ShapeInfo: { [key in string]: ButtonValue } = {
  circle: {
    name: "원형",
  },
  oval: {
    name: "타원형",
  },
  hexagon: {
    name: "육각형",
  },
  oblong: {
    name: "장방형",
  },
  pentagon: {
    name: "오각형",
  },
  rectangle: {
    name: "사각형",
  },
  triangle: {
    name: "삼각형",
  },
  rhombus: {
    name: "마름모형",
  },
  etc: {
    name: "기타",
  },
};
export const ColorInfo = {
  white: { name: "하양" },
  brown: { name: "갈색" },
  green: { name: "초록" },
  blue: { name: "파랑" },
  gray: { name: "회색" },
  orange: { name: "주황" },
  red: { name: "빨강" },
  black: { name: "검정" },
  pink: { name: "분홍" },
  purple: { name: "보라" },
  transparent: { name: "투명" },
};

export const PatternInfo = {
  pattern: {
    name: "있음",
  },
  noPattern: {
    name: "없음",
  },
};

export const SHAPE = "체형";
export const COLOR = "색상";
export const PATTERN = "문양";
