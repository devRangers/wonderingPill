import type { NextPage } from "next";
import Container from "@container/Container";
import GuidePageComp from "@guideComp/GuidePageComp";
import { NextSeo } from "next-seo";
import { GUIDE_SEO } from "next-seo.config";

const GuidePage: NextPage = () => {
  return (
    <>
      <NextSeo {...GUIDE_SEO} />
      <Container>
        <GuidePageComp />
      </Container>
    </>
  );
};

export default GuidePage;
