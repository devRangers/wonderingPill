import MainContainer from "./MainContainer";
import { Container } from "./Option.style";
import TitleContainer from "./TitleContainer";

export interface OptionPageProps {
  colors: string | string[];
  letters: string;
  shape: string;
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
