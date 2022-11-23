import { GetServerSideProps, NextPage } from "next";
import { PILLS } from "@utils/endpoint";
import ResultList from "@searchComp/resultList/ResultList";
import { PillSearchResponseDto } from "@modelTypes/pillSearchResponseDto";
import { PillSearchResponseDtoPills } from "@modelTypes/pillSearchResponseDtoPills";
import { NextSeo } from "next-seo";
import { RESULT_LIST_SEO } from "next-seo.config";

const ResultPage: NextPage<PillSearchResponseDtoPills> = (pills) => {
  return (
    <>
      <NextSeo {...RESULT_LIST_SEO} />
      <ResultList {...pills} />
    </>
  );
};

export default ResultPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { colors, letters, shape, mark, name } = context.query;

  const colorsResult = typeof colors === "object" ? colors.join("") : colors;
  const shapeResult = typeof shape === "object" ? shape.join("") : shape;
  const markReulst = typeof mark === "object" ? mark.join("") : mark;
  const lettersReulst =
    typeof letters === "object" ? letters.join("") : letters;
  const nameReulst = typeof name === "object" ? name.join("") : name;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${PILLS.SEARCH({
      shape: shapeResult || "",
      colors: colorsResult || "",
      mark: markReulst || "",
      letters: lettersReulst || "",
      name: nameReulst || "",
    })}`,
  );

  if (!result.ok) {
    return {
      notFound: true,
    };
  }

  const { pills }: PillSearchResponseDto = await result.json();

  return {
    props: {
      pills,
    },
  };
};
