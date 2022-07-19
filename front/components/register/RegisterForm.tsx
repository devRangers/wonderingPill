import Image from "next/image";
import { MAIN_COLOR } from "@utils/constant";
import {
  Container,
  EmptyBox,
  LogoContainer,
  HeaderContainer,
} from "./RegisterForm.style";
import Header from "@userContainer/Header";
import UserDataForm from "./UserDataForm";
import Authentication from "./Authentication";

const RegisterForm = () => {
  return (
    <Container $bgColor={MAIN_COLOR}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <LogoContainer>
        <Image
          src="/images/register_logo.png"
          alt="wondering-pill-logo"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </LogoContainer>
      <UserDataForm />
      <Authentication />
      <EmptyBox />
    </Container>
  );
};

export default RegisterForm;
