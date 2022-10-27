import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import * as Api from "@api";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";
import { FindAccountResponseUser as InfoType } from "@modelTypes/findAccountResponseUser";
import { AUTH } from "@utils/endpoint";
import Result from "@accountComp/emailResult/Result";

const FindEmailResultPage: NextPage = ({ name, email }: InfoType) => {
  return <Result name={name} email={email} />;
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
