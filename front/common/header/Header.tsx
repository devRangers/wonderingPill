import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HEADER_HEIGHT, MAIN_COLOR, ROUTE } from "@utils/constant";
import { BsFillBellFill, BsJustify } from "react-icons/bs";
import {
  HeaderEmptyBox,
  HeaderContainer,
  HamburgerBtn,
  ImageWrapper,
  BellBtn,
  Button,
} from "./Header.style";
import Sidebar from "@sidebar/Sidebar";

function Header() {
  const router = useRouter();
  const [openSideBar, setOpenSideBar] = useState(false);

  const closeSideBar = () => {
    setOpenSideBar(false);
  };
  return (
    <>
      <HeaderContainer $height={HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
        <HamburgerBtn onClick={() => setOpenSideBar(true)}>
          <BsJustify />
        </HamburgerBtn>
        <ImageWrapper>
          {router.pathname !== ROUTE.MAIN && (
            <Button onClick={() => router.push(ROUTE.MAIN)}>
              <Image
                src="/images/header/logo.png"
                alt="wondering-pill-logo"
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </Button>
          )}
        </ImageWrapper>
        <BellBtn onClick={() => router.push(ROUTE.MESSAGES)}>
          <BsFillBellFill />
        </BellBtn>
      </HeaderContainer>
      <HeaderEmptyBox $height={HEADER_HEIGHT} />
      <Sidebar openSideBar={openSideBar} closeSideBar={closeSideBar} />
    </>
  );
}

export default Header;
