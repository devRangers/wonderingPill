import Container from "@userContainer/Container";
import NewPasswordForm from "components/account/newPassword/NewPasswordForm";
import { NextSeo } from "next-seo";
import { NEW_PASSWORD_SEO } from "next-seo.config";

function NewPassword() {
  return (
    <>
      <NextSeo {...NEW_PASSWORD_SEO} />
      <Container>
        <NewPasswordForm />
      </Container>
    </>
  );
}

export default NewPassword;
