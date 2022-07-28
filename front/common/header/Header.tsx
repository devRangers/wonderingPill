import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Sidebar from "@sidebar/Sidebar";
import { HEADER_HEIGHT, MAIN_COLOR, ROUTE } from "@utils/constant";
import { BsJustify, BsFillBellFill } from "react-icons/bs";
import { HeaderEmptyBox, HeaderContainer, HamburgerBtn } from "./Header.style";

function Header() {
  const router = useRouter();
  const [openSideBar, setOpenSideBar] = useState(false);

  const closeSideBar = () => {
    setOpenSideBar(false);
  };
  return (
    <>
      <HeaderContainer $height={HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
        <HamburgerBtn onClick={() => setOpenSideBar(true)} />
        {router.pathname !== ROUTE.MAIN && (
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
