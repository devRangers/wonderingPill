import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import { Container, InnerContainer } from "./MyPage.style";

function MyPage() {
  return (
    <Container
      $bgColor={MAIN_COLOR}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <InnerContainer></InnerContainer>
    </Container>
  );
}

export default MyPage;
