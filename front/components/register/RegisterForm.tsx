import { useState } from "react";
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

export interface ApplySubmitValues {
  phoneNumber: string;
  authSelf: boolean;
  authUserData: boolean;
  checkAllBox: boolean;
}

const RegisterForm = () => {
  const [applySubmit, setApplySubmit] = useState<ApplySubmitValues>({
    phoneNumber: "",
    authSelf: false,
    authUserData: false,
    checkAllBox: false,
  });

  const handleSetApplySelfAuth = (phoneNumber: string) => {
    setApplySubmit((cur) => {
      return {
        ...cur,
        phoneNumber,
        authSelf: true,
      };
    });
  };

  const handleSetApplyAllCheckBox = (checkAllBox: boolean) => {
    setApplySubmit((cur) => {
      return {
        ...cur,
        checkAllBox,
      };
    });
  };

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
      <UserDataForm applySubmit={applySubmit} />
      <Authentication
        handleSetApplySelfAuth={handleSetApplySelfAuth}
        handleSetApplyAllCheckBox={handleSetApplyAllCheckBox}
      />
      <EmptyBox />
    </Container>
  );
};

export default RegisterForm;
