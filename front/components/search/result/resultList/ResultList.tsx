import React from "react";
import Image from "next/image";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  GREEN_COLOR,
  HEADER_HEIGHT,
  MAIN_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@utils/constant";
import { ImageWrapper } from "@header/Header.style";
import {
  Contianer,
  ContianerHeader,
  DescribeSection,
  Dot,
  DotWrapper,
  InnerContainer,
  Item,
  OuterContainer,
  PillImageSection,
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

function ResultList() {
  return (
    <OuterContainer
      $headerHeight={HEADER_HEIGHT}
      $fullHeight={FULL_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}>
      <Contianer $bgColor={MAIN_COLOR}>
        <ContianerHeader $bgColor={MAIN_COLOR}>
          <DotWrapper>
            <Dot $bgColor={RED_COLOR} />
            <Dot $bgColor={YELLOW_COLOR} />
            <Dot $bgColor={GREEN_COLOR} />
          </DotWrapper>
        </ContianerHeader>
        <InnerContainer $scrollColor={MAIN_COLOR}>
          {Object.entries(PillData).map(([key, value], index) => (
            <Item key={key} $borderColor={MAIN_COLOR}>
              <PillImageSection>
                <ImageWrapper>
                  <Image
                    src={value.image}
                    alt={value.describe}
                    priority={true}
                    layout="fill"
                    objectFit="fill"
                  />
                </ImageWrapper>
              </PillImageSection>
              <DescribeSection>{value.describe}</DescribeSection>
            </Item>
          ))}
        </InnerContainer>
      </Contianer>
    </OuterContainer>
  );
}

export default ResultList;
