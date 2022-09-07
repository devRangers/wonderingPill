import type { NextPage } from "next";
import { useState } from "react";
import { MAIN_COLOR, ACCENT_COLOR, GRAY_COLOR } from "@utils/constant";
import {
  ContentContainer,
  TitleContainer,
  Title,
  UnderLine,
  ListContainer,
  Header,
  Label,
  DeleteBtn,
  Body,
  List,
  MessageContainer,
  Message,
  Time,
  MoreBtn,
} from "@messagesComp/MessagesPage.style";
import Container from "@container/Container";

const fakeData = [
  {
    id: 1,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
  {
    id: 2,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
  {
    id: 3,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
  {
    id: 4,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
  {
    id: 5,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
  {
    id: 6,
    user_name: "지유",
    pill_name: "카엘정",
    time: "2022.09.07 20:21",
  },
];

const MessageListPage: NextPage = () => {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState([]);

  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <Title $txtColor={ACCENT_COLOR}>알림 목록</Title>
          <UnderLine $bgColor={MAIN_COLOR} />
        </TitleContainer>
        <ListContainer>
          <Header>
            <div>
              <input
                type="checkbox"
                name="select-all-messages"
                id="select-all-messages"
              />
              <Label htmlFor="select-all-messages">알림 전체 선택</Label>
            </div>
            <DeleteBtn>선택된 알림 삭제</DeleteBtn>
          </Header>
          <Body $scrollColor={ACCENT_COLOR}>
            {fakeData.map((message) => (
              <List key={message.id}>
                <input type="checkbox" name="messages" />
                <MessageContainer $borderColor={MAIN_COLOR}>
                  <Message>
                    약을 먹을 시간입니다!
                    <br />
                    {message.pill_name}
                  </Message>
                  <Time $txtColor={GRAY_COLOR}>{message.time}</Time>
                </MessageContainer>
              </List>
            ))}
          </Body>
          <MoreBtn $btnColor={ACCENT_COLOR}>더보기</MoreBtn>
        </ListContainer>
      </ContentContainer>
    </Container>
  );
};

export default MessageListPage;
