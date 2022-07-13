import type { NextPage } from "next";
import Container from "@userContainer/Container";
import LoginForm from "@loginComp/LoginForm";

const LoginPage: NextPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
