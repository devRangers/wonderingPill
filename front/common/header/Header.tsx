import { useState, useRef, useEffect } from "react";
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
  const headerRef = useRef<HTMLDivElement>(null);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [headerHeight, setHeaderHeight] = useState("");

  const closeSideBar = () => {
    setOpenSideBar(false);
  };

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight + "px");
    }
  }, [headerRef]);

  return (
    <>
      <HeaderContainer
        ref={headerRef}
        $height={HEADER_HEIGHT}
        $bgColor={MAIN_COLOR}>
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
      <HeaderEmptyBox $height={headerHeight} />
      <Sidebar openSideBar={openSideBar} closeSideBar={closeSideBar} />
    </>
  );
}

export default Header;
