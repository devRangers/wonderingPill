import type { NextPage } from "next";
import Container from "@userContainer/Container";
import LoginForm from "@loginComp/LoginForm";
import { NextSeo } from "next-seo";
import { LOGIN_SEO } from "next-seo.config";

const LoginPage: NextPage = () => {
  return (
    <>
      <NextSeo {...LOGIN_SEO} />
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default LoginPage;
