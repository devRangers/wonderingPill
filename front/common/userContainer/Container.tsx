import Image from "next/image";
import { MAIN_COLOR, ROUTE } from "@utils/constant";
import {
  MainContainer,
  HeaderContainer,
  LogoContainer,
} from "./Container.style";
import Header from "./Header";
import { useRouter } from "next/router";

interface UserContainerProps {
  children: React.ReactNode;
}

function Container({ children }: UserContainerProps) {
  const router = useRouter();
  const isLoginPage = router.asPath === ROUTE.LOGIN.link;
  return (
    <MainContainer $bgColor={MAIN_COLOR}>
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
