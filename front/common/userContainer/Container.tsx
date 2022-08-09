import Image from "next/image";
import { FULL_HEIGHT, MAIN_COLOR } from "@utils/constant";
import {
  MainContainer,
  HeaderContainer,
  LogoContainer,
} from "./Container.style";
import Header from "./Header";

interface UserContainerProps {
  children: React.ReactNode;
}

function Container({ children }: UserContainerProps) {
  return (
    <MainContainer $bgColor={MAIN_COLOR} $fullHeight={FULL_HEIGHT}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <LogoContainer>
        <Image
          src="/images/logo.png"
          alt="wondering-pill-logo"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </LogoContainer>
      {children}
    </MainContainer>
  );
}

export default Container;
