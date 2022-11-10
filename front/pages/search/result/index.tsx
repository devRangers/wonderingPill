import ResultList from "@searchComp/result/resultList/ResultList";
import { NextSeo } from "next-seo";
import { RESULT_SEO } from "next-seo.config";

function ResultPage() {
  return (
    <>
      <NextSeo {...RESULT_SEO} />
      <ResultList />
    </>
  );
}

export default ResultPage;
