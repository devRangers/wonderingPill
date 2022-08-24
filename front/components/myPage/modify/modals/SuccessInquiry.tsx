import React from "react";
import Modal from "@modal/Modal";
import { ACCENT_COLOR } from "@utils/constant";
import { CloseButton, ModalInner, Title } from "./Modal.style";

interface SuccessInquiryProp {
  isOpenModal: boolean;
  handleCloseSuccessInquiry: () => void;
}

function SuccessInquiry({
  isOpenModal,
  handleCloseSuccessInquiry,
}: SuccessInquiryProp) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseSuccessInquiry}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>고객 문의 완료</Title>
        <div>
          문의가 완료되었습니다. <br />
          답변은 등록된 이메일을 통해 받아보실 수 있습니다.
        </div>
        <CloseButton onClick={handleCloseSuccessInquiry}>닫기</CloseButton>
      </ModalInner>
    </Modal>
  );
}

export default SuccessInquiry;
