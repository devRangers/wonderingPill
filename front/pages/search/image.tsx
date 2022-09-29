import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { CAPTURE_GUIDE_MOAL_COOKIE } from "@utils/constant";
import FindWithImage, { FindWithImageProp } from "@searchComp/FindWithImage";

const Image: NextPage<FindWithImageProp> = ({ foundCookie }) => {
  return <FindWithImage foundCookie={foundCookie} />;
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
