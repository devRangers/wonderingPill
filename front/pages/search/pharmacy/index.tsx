import type { NextPage } from "next";
import SearchPharmacy from "@searchPharmComp/SearchPharmacy";
import { NextSeo } from "next-seo";
import { PHARMACY_SEO } from "next-seo.config";

const SearchPharmPage: NextPage = () => {
  return (
    <>
      <NextSeo {...PHARMACY_SEO} />
      <SearchPharmacy />;
    </>
  );
};

export default SearchPharmPage;
