import { MAIN_COLOR } from "@utils/constant";
import Image from "next/image";
import React from "react";
import {
  ImageSection,
  MainContainer,
  MainContent,
  MainSection,
} from "./Main.style";

function Main() {
  return (
    <MainContainer $bgColor={MAIN_COLOR}>
      <MainContent>
        <ImageSection>
          <Image
            src="/images/register_logo.png"
            alt="wondering-pill-logo"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </ImageSection>
        <MainSection></MainSection>
      </MainContent>
    </MainContainer>
  );
}

export default Main;
