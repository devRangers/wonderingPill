import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useState } from "react";
import _ from "lodash";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { CommonResponseDto as CommonResponse } from "@modelTypes/commonResponseDto";
import { MAIN_COLOR, ACCENT_COLOR, GRAY_COLOR, ROUTE } from "@utils/constant";
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
  alarms: MessageValues[];
}

interface deleteMessageValues {
  ids: string[];
}

const MessageListPage: NextPage = () => {
  const queryClient = useQueryClient();

  const [selectedMessagesId, setSelectedMessagesId] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageValues[]>([]);
  const [pageCount, setPageCount] = useState(1);

  useQuery(
    ["getMessages", pageCount],
    () => Api.get<MessageResponse>(`/alarms/${pageCount}`),
    {
      staleTime: 1000,
      cacheTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: ({ alarms }) => {
        console.log(messages, alarms);
        setMessages((prev) =>
          _.uniqBy([...prev, ...alarms], "id").filter(
            (message) => !selectedMessagesId.includes(message.id),
          ),
        );
      },
    },
  );

  const deleteMessagesMutation = useMutation(
    (data: deleteMessageValues) =>
      Api.post<CommonResponse, deleteMessageValues>("/alarms/delete", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMessages", pageCount]);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const deleteMessages = () => {
    const dataToSubmit = { ids: selectedMessagesId };
    deleteMessagesMutation.mutate(dataToSubmit);
  };

  const selectAllMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMessagesId(
      e.target.checked ? messages.map((message) => message.id) : [],
    );
  };

  const selectMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;

    if (checked) {
      setSelectedMessagesId((cur) => [...cur, id]);
    } else {
      setSelectedMessagesId((cur) =>
        cur.filter((messageId) => messageId !== id),
      );
    }
  };

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
                onChange={selectAllMessageHandler}
              />
              <Label htmlFor="select-all-messages">알림 전체 선택</Label>
            </div>
            <DeleteBtn onClick={deleteMessages}>선택된 알림 삭제</DeleteBtn>
          </Header>
          <Body $scrollColor={ACCENT_COLOR}>
            {messages.map((message) => (
              <List key={message.id}>
                <input
                  type="checkbox"
                  id={message.id}
                  name="messages"
                  checked={selectedMessagesId.includes(message.id)}
                  onChange={selectMessageHandler}
                />
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
