import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { CAPTURE_GUIDE_MOAL_COOKIE } from "@utils/constant";
import FindWithImage, { FindWithImageProp } from "@searchComp/FindWithImage";
import { NextSeo } from "next-seo";
import { SEARCH_IMAGE_SEO } from "next-seo.config";

const Image: NextPage<FindWithImageProp> = ({ foundCookie }) => {
  return (
    <>
      <NextSeo {...SEARCH_IMAGE_SEO} />
      <FindWithImage foundCookie={foundCookie} />
    </>
  );
};

export default Image;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const foundCookie = !!context.req.cookies[CAPTURE_GUIDE_MOAL_COOKIE];
  return {
    props: {
      foundCookie,
    },
  };
};
