import { useState } from "react";
import _ from "lodash";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { CommonResponseDto as CommonResponse } from "@modelTypes/commonResponseDto";
import { messageKeys } from "@utils/queryKey";
import { MAIN_COLOR, ACCENT_COLOR, TOASTIFY } from "@utils/constant";
import { ALARMS } from "@utils/endpoint";
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
  MoreBtn,
} from "@messagesComp/MessagesPage.style";
import Container from "@container/Container";
import Modal from "@modal/Modal";
import CheckModal from "@messagesComp/CheckModal";
import Messages, { MessageValues } from "@messagesComp/Messages";
import { toast } from "react-toastify";

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

function MessagesPageComp() {
  const queryClient = useQueryClient();

  const [selectedMessagesId, setSelectedMessagesId] = useState<string[]>([]); // 삭제할(된) 알림 목록 ID
  const [messages, setMessages] = useState<MessageValues[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<MessageValues>(messageInitialValue); // 복약 여부 버튼을 클릭한 메세지

  /*
   * 1. time 기준으로 역순 정렬(최신 알림 기록이 앞으로 가도록)
   * 2. check 기준으로 역순 정렬(true가 앞으로 가도록)
   * 3. id 기준으로 중복 제거
   * 4. 삭제된 메세지 필터링
   */

  useQuery(
    messageKeys.getMessages(pageCount),
    () => Api.get<MessageResponse>(ALARMS.PAGE(pageCount)),
    {
      onSuccess: ({ alarms }) => {
        setMessages((prev) =>
          _.uniqBy(
            [...prev, ...alarms].sort(function (cur, prev) {
              const prevCheck = Number(prev.check);
              const curCheck = Number(cur.check);
              const prevTime = Date.parse(prev.time);
              const curTime = Date.parse(cur.time);

              if (prevTime > curTime) return 1;
              if (prevTime < curTime) return -1;
              if (prevCheck > curCheck) return 1;
              if (prevCheck < curCheck) return -1;
              return 0;
            }),
            "id",
          ).filter((message) => !selectedMessagesId.includes(message.id)),
        );
      },
    },
  );

  const deleteMessagesMutation = useMutation(
    (data: deleteMessageValues) =>
      Api.post<CommonResponse, deleteMessageValues>(ALARMS.DELETE, data),
    {
      onSuccess: () => {
        // 삭제 성공 후 알림 목록 갱신
        queryClient.invalidateQueries(messageKeys.getMessages(pageCount));
      },
      onError: () => {
        toast.error(TOASTIFY.FAIL);
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
                <Messages
                  key={message.id}
                  message={message}
                  selectedMessagesId={selectedMessagesId}
                  selectMessageHandler={selectMessageHandler}
                  checkBtnClickHandler={checkBtnClickHandler}
                />
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
}

export default MessagesPageComp;
