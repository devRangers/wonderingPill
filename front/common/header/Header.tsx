import { HEADER_HEIGHT } from "@utils/constant";
import React from "react";
import { HeaderEmptyBox, HeaderContainer } from "./Header.style";

function Header() {
  return (
    <>
      <HeaderContainer $height={HEADER_HEIGHT}></HeaderContainer>
      <HeaderEmptyBox $height={HEADER_HEIGHT} />
    </>
  );
}

export default Header;
