import { FOOTER_HEIGHT, HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import {
  Camera,
  Container,
  Description,
  DescriptionContent,
  DescriptionFirstBox,
  DescriptionSecondBox,
  DescriptionTitle,
  FindWithImageContainer,
  Number,
  Title,
  TitleLine,
} from "./FindWithImage.style";

function FindWithImage() {
  return (
    <Container $headerHeight={HEADER_HEIGHT} $footerHeight={FOOTER_HEIGHT}>
      <FindWithImageContainer>
        <Camera $bgColor={MAIN_COLOR}></Camera>
        <Description>
          <DescriptionTitle>
            <TitleLine $bgColor={MAIN_COLOR} />
            <Title>사진으로 찾기 이용 방법</Title>
          </DescriptionTitle>
          <DescriptionFirstBox $bgColor={MAIN_COLOR}>
            <Number>1</Number>
            <DescriptionContent>
              위 일러스트를 클릭하고 알고 싶은 알약 사진을 찍으세요!
            </DescriptionContent>
          </DescriptionFirstBox>
          <DescriptionSecondBox $bgColor={MAIN_COLOR}>
            <Number>2</Number>
            <DescriptionContent>
              머신러닝으로 알아낸 알약 이름과 성분 등을 알아보세요!
            </DescriptionContent>
          </DescriptionSecondBox>
        </Description>
      </FindWithImageContainer>
    </Container>
  );
}

export default FindWithImage;
