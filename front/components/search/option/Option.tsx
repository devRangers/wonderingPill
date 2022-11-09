import React, { useState, useEffect, useCallback } from "react";
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
import { OptionPageProps } from "pages/search/option";
import ButtonSection from "./ButtonSection";
import Form from "./OptionForm";

export const SHAPE = "체형";
export const COLOR = "색상";
export const MARK = "문양";

export interface ButtonValue {
  name: string;
  isSelected: boolean;
}

const changeStateWithQuery = (
  buttons: { [key in string]: ButtonValue },
  queries: string | string[] | undefined,
) => {
  const curButtons = { ...buttons };

  if (typeof queries === "string") {
    curButtons[queries].isSelected = !curButtons[queries].isSelected;
  } else {
    Object.entries(curButtons).map(([key, value], index) => {
      if (queries?.includes(key)) {
        curButtons[key].isSelected = !curButtons[key].isSelected;
      }
    });
  }
  return curButtons;
};

function Option({ colors, letters, shape }: OptionPageProps) {
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

  const [markButtons, setMarkButtons] = useState<{
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

  const handleSetShapeButtons = useCallback((key: string) => {
    setShapeButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  const handleSetColorButtons = useCallback((key: string) => {
    setColorButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  const handleSetMarkButtons = useCallback((key: string) => {
    setMarkButtons((cur) => {
      const curButtons = { ...cur };
      Object.entries(curButtons).forEach(
        ([key, value], indedx) => (curButtons[key].isSelected = false),
      );
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  }, []);

  const setSelectedButtons = useCallback(
    (buttons: { [key in string]: ButtonValue }) => {
      return Object.entries(colorButtons)
        .filter(([key, value]) => value.isSelected === true)
        .flat()
        .filter((value, index) => index % 2 === 0);
    },
    [],
  );

  useEffect(() => {
    setShapeButtons(changeStateWithQuery(shapeButtons, shape));
    setColorButtons(changeStateWithQuery(colorButtons, colors));
  }, []);

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
    </Container>
  );
}

export default Option;
