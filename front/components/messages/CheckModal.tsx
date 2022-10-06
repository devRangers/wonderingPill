import { useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { messageKeys } from "@utils/queryKey";
import { GRAY_COLOR, ACCENT_COLOR, TOASTIFY } from "@utils/constant";
import {
  CheckModalContainer,
  CloseBtn,
  ModalText,
  BtnContainer,
  CheckModalBtn,
} from "./MessagesPage.style";
import { MessageValues } from "./Messages";
import { toast } from "react-toastify";

interface CheckModalProps {
  selectedMessage: MessageValues;
  pageCount: number;
  onClose: () => void;
}
function CheckModal({ selectedMessage, pageCount, onClose }: CheckModalProps) {
  const { id, pill_name } = selectedMessage;
  const queryClient = useQueryClient();

  const checkMutation = useMutation(() => Api.put(`/alarms/check/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(messageKeys.getMessages(pageCount));
      onClose();
    },
    onError: () => {
      toast.error(TOASTIFY.FAIL);
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
