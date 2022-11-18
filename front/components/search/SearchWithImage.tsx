import { memo } from "react";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import { isWideDevice } from "@utils/isWideDevice";
import {
  Camera,
  Container,
  Description,
  DescriptionContainer,
  DescriptionContent,
  DescriptionBox,
  DescriptionTitle,
  FindWithImageContainer,
  ImageWrapper,
  Numbering,
  Title,
  TitleLine,
} from "./Search.style";
import Capture from "./capture/Capture";

function SearchWithImage() {
  const isWide = isWideDevice();

  return (
    <Container
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <FindWithImageContainer $bgColor={MAIN_COLOR} $isWide={isWide}>
        <Camera $bgColor={MAIN_COLOR} $isWide={isWide}>
          <ImageWrapper>
            <Capture />
          </ImageWrapper>
        </Camera>
        <DescriptionContainer $isWide={isWide}>
          <Description $isWide={isWide}>
            <DescriptionTitle>
              <TitleLine $bgColor={MAIN_COLOR} />
              <Title>사진으로 찾기 이용 방법</Title>
            </DescriptionTitle>
            <DescriptionBox $bgColor={MAIN_COLOR}>
              <Numbering>1</Numbering>
              <DescriptionContent>
                위 일러스트를 클릭하고 알고 싶은 알약 사진을 찍으세요!
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox $bgColor={MAIN_COLOR}>
              <Numbering>2</Numbering>
              <DescriptionContent>
                머신러닝으로 알아낸 알약 이름과
                <br /> 성분 등을 알아보세요!
              </DescriptionContent>
            </DescriptionBox>
          </Description>
        </DescriptionContainer>
      </FindWithImageContainer>
    </Container>
  );
}

export default memo(SearchWithImage);
