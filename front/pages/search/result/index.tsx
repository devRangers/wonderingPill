import FilteringSearch from "@searchComp/result/Result";
import { NextSeo } from "next-seo";
import { RESULT_SEO } from "next-seo.config";

function Filter() {
  return (
    <>
      <NextSeo {...RESULT_SEO} />
      <FilteringSearch />
    </>
  );
}

export default Filter;
