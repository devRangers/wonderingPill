import { HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import React from "react";
import { HeaderEmptyBox, HeaderContainer } from "./Header.style";
import { BsJustify, BsFillBellFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <>
      <HeaderContainer $height={HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
        <BsJustify />
        {router.pathname !== "/" && (
          <Image
            src="/images/register_logo.png"
            alt="wondering-pill-logo"
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        )}
        <BsFillBellFill />
      </HeaderContainer>
      <HeaderEmptyBox $height={HEADER_HEIGHT} />
    </>
  );
}

export default Header;
