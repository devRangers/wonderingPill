import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import _ from "lodash";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { CommonResponseDto as CommonResponse } from "@modelTypes/commonResponseDto";
import {
  MAIN_COLOR,
  ACCENT_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  ROUTE,
} from "@utils/constant";
import { AiOutlineCheck } from "react-icons/ai";
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
  SettingBtn,
  CheckBtn,
  CheckBtnText,
  Time,
  MoreBtn,
} from "@messagesComp/MessagesPage.style";
import Container from "@container/Container";
import Modal from "@modal/Modal";
import CheckModal, { MessageValues } from "@messagesComp/CheckModal";

interface MessageResponse extends CommonResponse {
  alarms: MessageValues[];
}

interface deleteMessageValues {
  ids: string[];
}

const messageInitialValue: MessageValues = {
  id: "",
  user_id: "",
  user_name: "",
  pill_name: "",
  time: "",
  check: false,
  pillBookmarkId: "",
};

const MessageListPage: NextPage = () => {
  const queryClient = useQueryClient();

  const [selectedMessagesId, setSelectedMessagesId] = useState<string[]>([]); // 삭제할(된) 알림 목록 ID
  const [messages, setMessages] = useState<MessageValues[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<MessageValues>(messageInitialValue);

  /*
   * 1. check 기준으로 sort 후 reverse (check: true가 앞에 위치하도록)
   * 2. id를 기준으로 중복 제거
   * 3. time을 기준으로 sort 후 reverse (최신 알림이 위에 위치하도록)
   * 4. 삭제된 메세지 filter
   */

  useQuery(
    ["getMessages", pageCount],
    () => Api.get<MessageResponse>(`/alarms/${pageCount}`),
    {
      onSuccess: ({ alarms }) => {
        setMessages((prev) =>
          _.sortBy(
            _.uniqBy(_.sortBy([...prev, ...alarms], "check").reverse(), "id"),
            "time",
          )
            .reverse()
            .filter((message) => !selectedMessagesId.includes(message.id)),
        );
      },
    },
  );

  const deleteMessagesMutation = useMutation(
    (data: deleteMessageValues) =>
      Api.post<CommonResponse, deleteMessageValues>("/alarms/delete", data),
    {
      onSuccess: () => {
        // 삭제 성공 후 알림 목록 갱신
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

  const checkBtnClickHandler = (message: MessageValues) => {
    setSelectedMessage(message);
    setIsCheckModalOpen(true);
  };

  const closeCheckModalHandler = () => {
    setIsCheckModalOpen(false);
  };

  return (
    <>
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
              <DeleteBtn onClick={deleteMessages}>선택한 알림 삭제</DeleteBtn>
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
                    <Link href={`/messages/setting/${message.pillBookmarkId}`}>
                      <SettingBtn $btnColor={ACCENT_COLOR}>
                        설정하러 가기
                      </SettingBtn>
                    </Link>
                    <CheckBtn
                      disabled={message.check}
                      onClick={() => checkBtnClickHandler(message)}
                      $btnColor={message.check ? GREEN_COLOR : GRAY_COLOR}>
                      <CheckBtnText>복약 여부</CheckBtnText> <AiOutlineCheck />
                    </CheckBtn>
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
      {isCheckModalOpen && (
        <Modal open={isCheckModalOpen} onClose={closeCheckModalHandler}>
          <CheckModal
            onClose={closeCheckModalHandler}
            selectedMessage={selectedMessage}
            pageCount={pageCount}
          />
        </Modal>
      )}
    </>
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
