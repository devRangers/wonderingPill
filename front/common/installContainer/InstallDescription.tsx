import Image from "next/image";
import { SEMI_ACCENT_COLOR } from "@utils/constant";
import { CATEGORIES } from "./constant";
import {
  Container,
  DescriptionContainer,
  ImageContainer,
  TextContainer,
  Text,
} from "./InstallDescription.style";

interface InstallDescriptionProps {
  category: string;
}

function InstallDescription({ category }: InstallDescriptionProps) {
  const guideDescriptrion = Object.entries(CATEGORIES)
    .filter(([key, _]) => key === category)
    .map(([_, value]) => value)[0];

  return (
    <Container $descriptionLength={Object.keys(guideDescriptrion).length}>
      {Object.entries(guideDescriptrion).map(([key, value]) => (
        <DescriptionContainer key={key}>
          <TextContainer $bgColor={SEMI_ACCENT_COLOR}>
            <Text>{value}</Text>
          </TextContainer>
          <ImageContainer>
            <Image
              src={`/images/guide/${category}/${key}`}
              alt="install-description"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
        </DescriptionContainer>
      ))}
    </Container>
  );
}

export default InstallDescription;
