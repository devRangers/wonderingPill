import { NextPage } from "next";
import RegisterForm from "components/register/RegisterForm";
import { NextSeo } from "next-seo";
import { REGISTER_SEO } from "next-seo.config";

const RegisterPage: NextPage = () => {
  return (
    <>
      <NextSeo {...REGISTER_SEO} />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
