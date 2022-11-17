import { ACCENT_COLOR, MAIN_COLOR } from "@utils/constant";
import {
  Description,
  Title,
  TitleContainer as Container,
  TitleContent,
  TopBorder,
} from "./Option.style";

function TitleContainer() {
  return (
    <Container>
      <TitleContent>
        <TopBorder $borderColor={ACCENT_COLOR} />
        <Title $color={ACCENT_COLOR}>약 검색</Title>
        <Description $color={MAIN_COLOR}>
          머신러닝으로 추출한 검색값을 <br /> 확인해보세요!
        </Description>
      </TitleContent>
    </Container>
  );
}

export default TitleContainer;
