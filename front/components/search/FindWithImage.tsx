import { FOOTER_HEIGHT, HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import {
  Camera,
  Container,
  Description,
  DescriptionFirstBox,
  DescriptionSecondBox,
  DescriptionTitle,
  FindWithImageContainer,
  Title,
  TitleLine,
} from "./FindWithImage.style";

function FindWithImage() {
  return (
    <Container $headerHeight={HEADER_HEIGHT} $footerHeight={FOOTER_HEIGHT}>
      <FindWithImageContainer>
        <Camera></Camera>
        <Description>
          <DescriptionTitle>
            <TitleLine $bgColor={MAIN_COLOR} />
            <Title>사진으로 찾기 이용 방법</Title>
          </DescriptionTitle>
          <DescriptionFirstBox></DescriptionFirstBox>
          <DescriptionSecondBox></DescriptionSecondBox>
        </Description>
      </FindWithImageContainer>
    </Container>
  );
}

export default FindWithImage;
