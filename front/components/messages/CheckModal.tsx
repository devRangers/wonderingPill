import { useMutation, useQueryClient } from "react-query";
import * as Api from "@api/api";
import { messageKeys } from "@utils/queryKey";
import { GRAY_COLOR, ACCENT_COLOR } from "@utils/constant";
import { ALARMS } from "@utils/endpoint";
import { Toastify } from "@utils/toastify";
import { GetAlarmsResponse as MessageValues } from "@modelTypes/getAlarmsResponse";
import {
  CheckModalContainer,
  CloseBtn,
  ModalText,
  BtnContainer,
  CheckModalBtn,
} from "./MessagesPage.style";

interface CheckModalProps {
  selectedMessage: MessageValues;
  pageCount: number;
  onClose: () => void;
}
function CheckModal({ selectedMessage, pageCount, onClose }: CheckModalProps) {
  const { id, pill_name } = selectedMessage;
  const queryClient = useQueryClient();

  const checkMutation = useMutation(() => Api.put(ALARMS.CHECK_ID(id)), {
    onSuccess: () => {
      queryClient.invalidateQueries(messageKeys.getMessages(pageCount));
      onClose();
    },
    onError: () => {
      Toastify.fail();
    },
  });

  const checkBtnClickHandler = () => {
    checkMutation.mutate();
  };

  return (
    <CheckModalContainer>
      <CloseBtn $btnColor={GRAY_COLOR} onClick={onClose}>
        닫기
      </CloseBtn>
      <ModalText>
        {pill_name}
        <br />
        약을 챙겨드셨나요?
      </ModalText>
      <BtnContainer>
        <CheckModalBtn
          $positive
          $btnColor={ACCENT_COLOR}
          onClick={checkBtnClickHandler}>
          예
        </CheckModalBtn>
        <CheckModalBtn $btnColor={ACCENT_COLOR} onClick={onClose}>
          아니오
        </CheckModalBtn>
      </BtnContainer>
    </CheckModalContainer>
  );
}

export default CheckModal;
