import Container from "@userContainer/Container";
import RegisterForm from "components/register/RegisterForm";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
