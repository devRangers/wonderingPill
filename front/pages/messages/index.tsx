import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import * as Api from "@api";
import { CommonResponseDto as CommonResponse } from "@modelTypes/commonResponseDto";
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

interface MessageValues {
  id: string;
  user_name: string;
  pill_name: string;
  time: string;
  user_id: string;
}

interface MessageResponse extends CommonResponse {
  result: MessageValues[];
}

const MessageListPage: NextPage = () => {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageValues[]>([]);
  const [pageCount, setPageCount] = useState(1);

  useQuery(
    ["getMessages", pageCount],
    () => Api.get<MessageResponse>(`/alarms/${pageCount}`),
    {
      retry: false,
      onSuccess: ({ result }) => {
        setMessages((prev) => [...new Set([...prev, ...result])]);
      },
    },
  );

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
            {messages.map((message) => (
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
          <MoreBtn
            $btnColor={ACCENT_COLOR}
            onClick={() => setPageCount((cur) => cur + 1)}>
            더보기
          </MoreBtn>
        </ListContainer>
      </ContentContainer>
    </Container>
  );
};

export default MessageListPage;
