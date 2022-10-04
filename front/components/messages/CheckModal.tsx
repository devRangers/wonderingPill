import { useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { GRAY_COLOR, ACCENT_COLOR } from "@utils/constant";
import {
  CheckModalContainer,
  CloseBtn,
  ModalText,
  BtnContainer,
  CheckModalBtn,
} from "./MessagesPage.style";

export interface MessageValues {
  id: string;
  user_id: string;
  user_name: string;
  pill_name: string;
  time: string;
  check: boolean;
  pillBookmarkId: string;
}

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
      queryClient.invalidateQueries(["getMessages", pageCount]);
      onClose();
    },
    onError: (err) => {
      console.log(err);
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
