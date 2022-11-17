import { GetServerSideProps, NextPage } from "next";
import Option from "@searchOptionComp/Option";
import { NextSeo } from "next-seo";
import { OPTION_SEO } from "next-seo.config";

export interface OptionPageProps {
  colors: string | string[];
  letters: string;
  shape: string;
}

const OptionPage: NextPage<OptionPageProps> = ({ colors, letters, shape }) => {
  return (
    <>
      <NextSeo {...OPTION_SEO} />
      <Option colors={colors} letters={letters} shape={shape} />
    </>
  );
};

export default OptionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { colors, letters, shape } = context.query;

  return {
    props: {
      colors: colors ? colors : "",
      letters: letters ? letters : "",
      shape: shape ? shape : "",
    },
  };
};
