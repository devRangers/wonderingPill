import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import * as Api from "@api";
import { CommonResponseDto as Response } from "@modelTypes/commonResponseDto";
import { SetAlarmDto as SetAlarmValues } from "@modelTypes/setAlarmDto";
import { MAIN_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import { getToken } from "@utils/firebase";
import {
  ContentContainer,
  TitleContainer,
  TopLine,
  Title,
  LinkBtn,
  MessageContainer,
  NotificationForm,
  NotificationTitle,
  Hr,
  SubmitBtn,
} from "@messagesComp/setting/SetNotificationPage.style";
import Container from "@container/Container";
import Switch from "@messagesComp/setting/Switch";
import TimeForm from "@messagesComp/setting/TimeForm";
import RemindForm from "@messagesComp/setting/RemindForm";

type SettingFormValues = Pick<SetAlarmValues, "hour" | "minute" | "repeatTime">;

const fakeData = {
  name: "가스모틴정",
  link: "/messages/setting/124",
};

const initialValue: SettingFormValues = {
  hour: 0,
  minute: 0,
  repeatTime: 0,
};

const SetNotificationPage: NextPage = () => {
  const [user] = useAtom(userAtom);

  const [isNotificationToggle, setIsNotificationToggle] = useState(false);
  const [isRemindToggle, setIsRemindToggle] = useState(false);
  const [isAfternoon, setIsAfternoon] = useState(false);
  const [vip, setVip] = useState<number[]>([]);
  const [deviceToken, setDeviceToken] = useState("");

  const setAlarmMutation = useMutation(
    (data: SetAlarmValues) =>
      Api.post<Response, SetAlarmValues>("/alarms/set-alarm", data),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      if (isNotificationToggle) {
        const { hour, repeatTime, minute } = values;
        const dataToSubmit: SetAlarmValues = {
          deviceToken,
          vip,
          minute,
          hour: isAfternoon && hour < 12 ? hour + 12 : hour,
          pillName: fakeData.name,
          userName: typeof user.name === "string" ? user.name : "",
          repeatTime: isRemindToggle ? repeatTime : 0,
        };
        setAlarmMutation.mutate(dataToSubmit);
      } else {
        // TODO: 알림 취소
      }
    },
  });

  useEffect(() => {
    async function getDeviceToken() {
      const temp = await getToken();
      if (temp !== null) {
        setDeviceToken(temp);
      }
    }
    getDeviceToken();
  }, []);

  return (
    <Container>
      <ContentContainer onSubmit={formik.handleSubmit}>
        <TitleContainer>
          <TopLine $bgColor={SEMI_ACCENT_COLOR} />
          <Title $txtColor={SEMI_ACCENT_COLOR}>{fakeData.name}</Title>
          <Link href={fakeData.link}>
            <LinkBtn $txtColor={MAIN_COLOR}>알약 상세 정보 보러가기 →</LinkBtn>
          </Link>
        </TitleContainer>
        <MessageContainer $borderColor={MAIN_COLOR}>
          <NotificationForm>
            <NotificationTitle $txtColor={SEMI_ACCENT_COLOR}>
              푸시 알림 설정{" "}
              <Switch
                isToggle={isNotificationToggle}
                setIsToggle={setIsNotificationToggle}
              />
            </NotificationTitle>
            <Hr $borderColor={SEMI_ACCENT_COLOR} />
          </NotificationForm>
          <TimeForm
            disabled={!isNotificationToggle}
            isAfternoon={isAfternoon}
            onChange={formik.handleChange}
            setVip={setVip}
            setIsAfternoon={setIsAfternoon}
          />
          <RemindForm
            disabled={!isNotificationToggle}
            isRemindToggle={isRemindToggle}
            setIsRemindToggle={setIsRemindToggle}
            onChange={formik.handleChange}
          />
        </MessageContainer>
        <SubmitBtn type="submit" $btnColor={MAIN_COLOR}>
          저장하기
        </SubmitBtn>
      </ContentContainer>
    </Container>
  );
};

export default SetNotificationPage;

// TODO: 알림 정보 가져오기(getServerSideProps)
