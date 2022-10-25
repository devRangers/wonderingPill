import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { GetAlarmSetResponseDto as GetAlarmResponse } from "@modelTypes/getAlarmSetResponseDto";
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

  const { alarm }: GetAlarmResponse = await res.json();

  return {
    props: {
      bookmarkId,
      setting: {
        minute: typeof alarm.minute === "number" ? alarm.minute : 0,
        hour: typeof alarm.hour === "number" ? alarm.hour : 0,
        vip: typeof alarm.vip === "object" ? alarm.vip : [],
        repeatTime: typeof alarm.repeatTime === "number" ? alarm.repeatTime : 0,
        pillName: typeof alarm.pillName === "string" ? alarm.pillName : "",
      },
    },
  };
};
