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
import Form from "./OptionForm";
import {
  COLOR,
  ColorInfo,
  PATTERN,
  PatternInfo,
  SHAPE,
  ShapeInfo,
} from "./optionData";

function Option() {
  const [isShapeSelected, setIsShapeSelected] = useState(
    Array(Object.keys(ShapeInfo).length).fill(false),
  );

  const [isColorSelected, setIsColorSelected] = useState(
    Array(Object.keys(ColorInfo).length).fill(false),
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
        <Form />
      </MainContent>
    </Container>
  );
}

export default Option;
