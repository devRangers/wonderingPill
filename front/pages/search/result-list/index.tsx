import ResultList from "@searchComp/resultList/ResultList";
import { NextSeo } from "next-seo";
import { RESULT_LIST_SEO } from "next-seo.config";

function ResultPage() {
  return (
    <>
      <NextSeo {...RESULT_LIST_SEO} />
      <ResultList />
    </>
  );
}

export default ResultPage;
