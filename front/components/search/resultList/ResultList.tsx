import React from "react";
import Image from "next/image";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  GREEN_COLOR,
  HEADER_HEIGHT,
  LIGHT_GRAY_COLOR,
  MAIN_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@utils/constant";
import { PillSearchResponseDtoPills } from "@modelTypes/pillSearchResponseDtoPills";
import { ImageWrapper } from "@header/Header.style";
import {
  Container,
  ContainerHeader,
  DescribeSection,
  Dot,
  DotWrapper,
  InnerContainer,
  Item,
  OuterContainer,
  PillImageSection,
  TotalSearchCount,
} from "./ResultList.style";

interface PillDataValue {
  image: string;
  describe: string;
}

const PillData: { [key in string]: PillDataValue } = {
  pill1: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill2: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill3: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill4: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill5: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill6: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
  pill7: {
    image: "/images/logo.png",
    describe: "한미아스피린장용정100밀리그램",
  },
};

function ResultList(pills: PillSearchResponseDtoPills) {
  console.log(pills);
  return (
    <OuterContainer
      $headerHeight={HEADER_HEIGHT}
      $fullHeight={FULL_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}>
      <Container $borderColor={MAIN_COLOR}>
        <ContainerHeader>
          <DotWrapper>
            <Dot $bgColor={RED_COLOR} />
            <Dot $bgColor={YELLOW_COLOR} />
            <Dot $bgColor={GREEN_COLOR} />
          </DotWrapper>
          <TotalSearchCount>총 14개가 검색되었습니다.</TotalSearchCount>
        </ContainerHeader>
        <InnerContainer $scrollColor={MAIN_COLOR} $bgColor={LIGHT_GRAY_COLOR}>
          {Object.entries(PillData).map(([key, value], index) => (
            <Item key={key} $borderColor={MAIN_COLOR}>
              <PillImageSection>
                <ImageWrapper>
                  <Image
                    src={value.image}
                    alt={value.describe}
                    layout="fill"
                    objectFit="fill"
                  />
                </ImageWrapper>
              </PillImageSection>
              <DescribeSection>{value.describe}</DescribeSection>
            </Item>
          ))}
        </InnerContainer>
      </Container>
    </OuterContainer>
  );
}

export default ResultList;
