import Image from "next/image";
import { MAIN_COLOR } from "@utils/constant";
import {
  AuthenticationForm,
  AuthenticationInput,
  CheckBox,
  Container,
  CustomCheckmark,
  EmptyBox,
  ErrorMessage,
  Label,
  LabelWrapper,
  LogoContainer,
  PhoneNumberContainer,
  SubmitAuthenticationBtn,
} from "./RegisterForm.style";
import { HeaderContainer } from "@userContainer/Container.style";
import { CheckboxContainer } from "./RegisterForm.style";
import Header from "@userContainer/Header";
import UserDAtaForm from "./UserDAtaForm";
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
      <UserDAtaForm />
      <Authentication />
      <EmptyBox />
    </Container>
  );
};

export default RegisterForm;
