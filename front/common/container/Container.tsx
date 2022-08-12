import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import React from "react";
import { Container as OuterContainer, InnerContainer } from "./Container.style";

interface ContainerProp {
  childern: React.ReactNode;
}

function Container({ childern }: ContainerProp) {
  return (
    <OuterContainer
      $bgColor={MAIN_COLOR}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <InnerContainer>{childern}</InnerContainer>
    </OuterContainer>
  );
}

export default Container;
