import { OptionPageProps } from "pages/search/option";
import MainContainer from "./MainContainer";
import { Container } from "./index.style";
import TitleContainer from "./TitleContainer";

export interface ButtonValue {
  name: string;
  isSelected: boolean;
}

function Option({ colors, letters, shape }: OptionPageProps) {
  return (
    <Container>
      <TitleContainer />
      <MainContainer shape={shape} letters={letters} colors={colors} />
    </Container>
  );
}

export default Option;
