import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { MAIN_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
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

const SetNotificationPage: NextPage = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <Container>
      <ContentContainer>
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
          <TimeForm disabled={!isToggle} />
          <RemindForm disabled={!isToggle} />
        </MessageContainer>
        <SubmitBtn $btnColor={MAIN_COLOR}>등록하기</SubmitBtn>
      </ContentContainer>
    </Container>
  );
};

export default SetNotificationPage;
