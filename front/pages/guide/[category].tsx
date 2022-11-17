import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ROUTE, SEMI_ACCENT_COLOR } from "@utils/constant";
import { LinkBtn } from "@guideComp/GuidePageComp.style";
import InstallDescription from "@installContainer/InstallDescription";

interface GuideCategoryPageProps {
  category: string;
}

const GuideCategoryPage: NextPage<GuideCategoryPageProps> = ({ category }) => {
  return (
    <>
      <InstallDescription category={category} />
      <Link href={ROUTE.GUIDE}>
        <LinkBtn $btnColor={SEMI_ACCENT_COLOR}>
          ← 설치 가이드 페이지로 돌아가기
        </LinkBtn>
      </Link>
    </>
  );
};

export default GuideCategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = typeof query.category === "string" ? query.category : "";

  return {
    props: { category },
  };
};
