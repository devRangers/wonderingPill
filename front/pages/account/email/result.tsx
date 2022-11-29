import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import * as Api from "@api/api";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";
import { FindAccountResponseUser as InfoType } from "@modelTypes/findAccountResponseUser";
import { AUTH } from "@utils/endpoint";
import Result from "@accountComp/emailResult/Result";
import { NextSeo } from "next-seo";
import { EMAIL_RESULT_SEO } from "next-seo.config";

const FindEmailResultPage: NextPage = ({ name, email }: InfoType) => {
  return (
    <>
      <NextSeo {...EMAIL_RESULT_SEO} />
      <Result name={name} email={email} />;
    </>
  );
};

export default FindEmailResultPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  const { user } = await Api.get<FindAccountResponse>(
    AUTH.FIND_ACCOUNT(userId),
  );
  return {
    props: user,
  };
};
