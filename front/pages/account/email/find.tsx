import type { NextPage } from "next";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";
import { NextSeo } from "next-seo";
import { FIND_EMAIL_SEO } from "next-seo.config";

const FindEmailPage: NextPage = () => {
  return (
    <>
      <NextSeo {...FIND_EMAIL_SEO} />
      <Container>
        <FindEmailForm />
      </Container>
    </>
  );
};

export default FindEmailPage;
