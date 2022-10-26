import Link from "next/link";
import {
  MAIN_COLOR,
  ACCENT_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  ROUTE,
} from "@utils/constant";
import { GetAlarmsResponse as MessageValues } from "@modelTypes/getAlarmsResponse";
import { AiOutlineCheck } from "react-icons/ai";
import {
  List,
  MessageContainer,
  Message,
  SettingBtn,
  CheckBtn,
  CheckBtnText,
  Time,
} from "./MessagesPage.style";

interface MessagesProps {
  message: MessageValues;
  selectedMessagesId: string[];
  selectMessageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkBtnClickHandler: (message: MessageValues) => void;
}

function Messages({
  message,
  selectedMessagesId,
  selectMessageHandler,
  checkBtnClickHandler,
}: MessagesProps) {
  return (
    <List>
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
        <Link href={ROUTE.MESSAGES_SETTING(message.pillBookmarkId)}>
          <SettingBtn $btnColor={ACCENT_COLOR}>설정하러 가기</SettingBtn>
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
  );
}

export default Messages;
