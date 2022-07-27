import { HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import React, { useState } from "react";
import { HeaderEmptyBox, HeaderContainer } from "./Header.style";
import { BsJustify, BsFillBellFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import Sidebar from "common/sidebar/Sidebar";

function Header() {
  const router = useRouter();
  const [openSideBar, setOpenSideBar] = useState(false);

  const closeSideBar = () => {
    setOpenSideBar(false);
  };
  return (
    <>
      <HeaderContainer $height={HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
        <BsJustify onClick={() => setOpenSideBar(true)} />
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
      <Sidebar openSideBar={openSideBar} closeSideBar={closeSideBar} />
    </>
  );
}

export default Header;
