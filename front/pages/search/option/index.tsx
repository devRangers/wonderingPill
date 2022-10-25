import Option from "@searchComp/option/Option";
import { NextSeo } from "next-seo";
import { OPTION_SEO } from "next-seo.config";

function OptionPage() {
  return (
    <>
      <NextSeo {...OPTION_SEO} />
      <Option />
    </>
  );
}

export default OptionPage;
