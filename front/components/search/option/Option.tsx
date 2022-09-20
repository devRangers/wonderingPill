import React, { useState } from "react";
import Image from "next/image";
import { ACCENT_COLOR, MAIN_COLOR } from "@utils/constant";
import {
  Container,
  Description,
  ImageContainer,
  MainContent,
  Title,
  TitleContainer,
  TitleContent,
  TopBorder,
} from "./Option.style";
import ButtonSection from "./ButtonSection";

export interface ButtonValue {
  name: string;
}

const ShapeInfo: { [key in string]: ButtonValue } = {
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
const ColorInfo = {
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

const PatternInfo = {
  pattern: {
    name: "있음",
  },
  noPattern: {
    name: "없음",
  },
};

const SHAPE = "체형";
const COLOR = "색상";
const PATTERN = "문양";

function Option() {
  const [isShapeSelected, setIsShapeSelected] = useState(
    Array.from({ length: Object.keys(ShapeInfo).length }, () => false),
  );

  const [isColorSelected, setIsColorSelected] = useState(
    Array.from({ length: Object.keys(ColorInfo).length }, () => false),
  );

  const [isPatternSelected, setIsPatternSelected] = useState([true, false]);

  const handleClickShapeButtonSelect = (index: number) => {
    setIsShapeSelected((cur) => {
      const curArr = [...cur];
      curArr[index] = !curArr[index];
      return curArr;
    });
  };

  const handleClickColorButtonSelect = (index: number) => {
    setIsColorSelected((cur) => {
      const curArr = [...cur];
      curArr[index] = !curArr[index];
      return curArr;
    });
  };

  const handleClickPatternButtonSelect = () => {
    setIsPatternSelected((cur) => {
      const curArr = [...cur];
      curArr[0] = !curArr[0];
      curArr[1] = !curArr[1];

      return curArr;
    });
  };

  return (
    <Container>
      <TitleContainer>
        <TitleContent>
          <TopBorder $borderColor={ACCENT_COLOR} />
          <Title $color={ACCENT_COLOR}>약 검색</Title>
          <Description $color={MAIN_COLOR}>
            머신러닝으로 추출한 검색값을 <br /> 확인해보세요!
          </Description>
        </TitleContent>
        <ImageContainer>
          <Image
            src="/images/logo.png"
            alt="wondering-pill-logo"
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </ImageContainer>
      </TitleContainer>
      <MainContent $borderColor={MAIN_COLOR}>
        <ButtonSection
          title={SHAPE}
          buttons={ShapeInfo}
          isButtonSelected={isShapeSelected}
          handleClickButtonSelect={handleClickShapeButtonSelect}
        />
        <ButtonSection
          title={COLOR}
          buttons={ColorInfo}
          isButtonSelected={isColorSelected}
          handleClickButtonSelect={handleClickColorButtonSelect}
        />
        <ButtonSection
          title={PATTERN}
          buttons={PatternInfo}
          isButtonSelected={isPatternSelected}
          handleClickButtonSelect={handleClickPatternButtonSelect}
        />
      </MainContent>
    </Container>
  );
}

export default Option;
