import { FOOTER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import React from "react";
import { FooterContainer } from "./Footer.style";

function Footer() {
  return (
    <FooterContainer $bgColor={MAIN_COLOR} $height={FOOTER_HEIGHT}>
      @devRangers
    </FooterContainer>
  );
}

export default Footer;
