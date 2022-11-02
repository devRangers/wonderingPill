import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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
  changeStateWithQuery,
  COLOR,
  ColorButtons,
  PATTERN,
  PatternButtons,
  SHAPE,
  ShapeButtons,
} from "./optionData";

function Option() {
  const router = useRouter();

  const colors = router.query.colors;
  const letters = router.query.letters as string | undefined;
  const shape = router.query.shape as string | undefined;

  const [shapeButtons, setShapeButtons] = useState(
    changeStateWithQuery(ShapeButtons, shape),
  );

  const [colorButtons, setColorButtons] = useState(
    changeStateWithQuery(ColorButtons, colors),
  );

  const [patternButtons, setPatternButtons] = useState(PatternButtons);

  const handleClickShapeButtonSelect = (key: string) => {
    setShapeButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  };

  const handleClickColorButtonSelect = (key: string) => {
    setColorButtons((cur) => {
      const curButtons = { ...cur };
      curButtons[key].isSelected = !curButtons[key].isSelected;
      return curButtons;
    });
  };

  const handleClickPatternButtonSelect = () => {
    setPatternButtons((cur) => {
      const curButtons = { ...cur };
      Object.entries(PatternButtons).map(
        ([key, value], index) =>
          (PatternButtons[key].isSelected = !PatternButtons[key].isSelected),
      );
      return curButtons;
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
          buttons={shapeButtons}
          handleClickButtonSelect={handleClickShapeButtonSelect}
        />
        <ButtonSection
          title={COLOR}
          buttons={colorButtons}
          handleClickButtonSelect={handleClickColorButtonSelect}
        />
        <ButtonSection
          title={PATTERN}
          buttons={patternButtons}
          handleClickButtonSelect={handleClickPatternButtonSelect}
        />
        <Form word={letters} />
      </MainContent>
    </Container>
  );
}

export default Option;
