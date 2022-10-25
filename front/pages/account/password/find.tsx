import Container from "@userContainer/Container";
import FindPasswordForm from "components/account/findPassword/FindPasswordForm";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { FIND_PASSWORD_SEO } from "next-seo.config";

function FindPassword() {
  const router = useRouter();
  return (
    <>
      <NextSeo {...FIND_PASSWORD_SEO} />

      <Container>
        <FindPasswordForm />
      </Container>
    </>
  );
}

export default FindPassword;
