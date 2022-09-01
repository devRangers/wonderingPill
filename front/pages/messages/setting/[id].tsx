import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
import { useFormik } from "formik";
import * as Yup from "yup";
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

const fakeData = {
  name: "가스모틴정",
  link: "/messages/setting/124",
};

const initialValue = {
  hour: 0,
  minute: 0,
  repeatTime: 0,
};

const SetNotificationPage: NextPage = () => {
  const [user] = useAtom(userAtom);

  const [isToggle, setIsToggle] = useState(false);
  const [isAfternoon, setIsAfternoon] = useState(false);
  const [vip, setVip] = useState<number[]>([]);
  const [deviceToken, setDeviceToken] = useState("");

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      const { hour, ...data } = values;
      const dataToSubmit = Object.assign(data, {
        deviceToken,
        vip,
        hour: isAfternoon && hour < 12 ? hour + 12 : hour,
        pillName: fakeData.name,
        userName: user.name,
      });
      console.log(dataToSubmit);
      // TODO: api 연결
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
              <Switch isToggle={isToggle} setIsToggle={setIsToggle} />
            </NotificationTitle>
            <Hr $borderColor={SEMI_ACCENT_COLOR} />
          </NotificationForm>
          <TimeForm
            disabled={!isToggle}
            isAfternoon={isAfternoon}
            onChange={formik.handleChange}
            setVip={setVip}
            setIsAfternoon={setIsAfternoon}
          />
          <RemindForm disabled={!isToggle} onChange={formik.handleChange} />
        </MessageContainer>
        <SubmitBtn type="submit" $btnColor={MAIN_COLOR}>
          저장하기
        </SubmitBtn>
      </ContentContainer>
    </Container>
  );
};

export default SetNotificationPage;
