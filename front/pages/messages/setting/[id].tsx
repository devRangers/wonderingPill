import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { GetAlarmSettingResponseDto as MessageResponse } from "@modelTypes/getAlarmSettingResponseDto";
import { ROUTE } from "@utils/constant";
import { ALARMS } from "@utils/endpoint";
import SetNotificationPageComp, {
  SetNotificationPageProps,
} from "@messagesComp/setting/SetNotificationPageComp";

const SetNotificationPage: NextPage<SetNotificationPageProps> = ({
  bookmarkId,
  setting,
}) => {
  return <SetNotificationPageComp bookmarkId={bookmarkId} setting={setting} />;
};

export default SetNotificationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bookmarkId = context.query.id;
  const token = context.req.cookies["AccessToken"] || null;

  if (!token) {
    return {
      redirect: { destination: ROUTE.MAIN, permanent: false },
      props: {},
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${ALARMS.SET_ID(bookmarkId)}`,
    {
      headers: {
        Cookie: `AccessToken=${token}`,
      },
    },
  );

  if (!res.ok) {
    return {
      redirect: { destination: ROUTE.MAIN, permanent: false },
      props: {},
    };
  }

  const { alarm }: MessageResponse = await res.json();

  return {
    props: {
      bookmarkId,
      setting: alarm,
    },
  };
};
