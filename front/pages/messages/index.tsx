import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { ROUTE } from "@utils/constant";
import MessagesPageComp from "@messagesComp/MessagesPageComp";

const MessageListPage: NextPage = () => {
  return <MessagesPageComp />;
};

export default MessageListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["AccessToken"] || null;

  if (!token) {
    return {
      redirect: { destination: ROUTE.MAIN, permanent: false },
      props: {},
    };
  }

  return {
    props: {},
  };
};
