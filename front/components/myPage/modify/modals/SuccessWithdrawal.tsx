import React from "react";
import Modal from "@modal/Modal";
import { ACCENT_COLOR } from "@utils/constant";
import { ModalInner, TextArea, Title } from "./Modal.style";

interface SuccessWithdrawalProp {
  isOpenModal: boolean;
  handleCloseSuccessWithdrawal: () => void;
}

function SuccessWithdrawal({
  isOpenModal,
  handleCloseSuccessWithdrawal,
}: SuccessWithdrawalProp) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseSuccessWithdrawal}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>회원 탈퇴 완료</Title>
        <TextArea></TextArea>
      </ModalInner>
    </Modal>
  );
}

export default SuccessWithdrawal;
