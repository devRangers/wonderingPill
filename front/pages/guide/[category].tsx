import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import InstallDescription from "@installContainer/InstallDescription";

interface GuideCategoryPageProps {
  category: string;
}

const GuideCategoryPage: NextPage<GuideCategoryPageProps> = ({ category }) => {
  return <InstallDescription category={category} />;
};

export default GuideCategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = typeof query.category === "string" ? query.category : "";

  return {
    props: { category },
  };
};
