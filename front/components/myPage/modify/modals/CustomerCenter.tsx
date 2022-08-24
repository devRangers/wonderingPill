import React from "react";
import Modal from "@modal/Modal";
import { ACCENT_COLOR, SUB_COLOR } from "@utils/constant";
import {
  Bottom,
  CloseButton,
  TextArea,
  ModalInner,
  SubmitButton,
  Title,
} from "./Modal.style";

interface CustomerCenterProp {
  isOpenModal: boolean;
  handleCloseCustomerCenter: () => void;
}

function CustomerCenter({
  isOpenModal,
  handleCloseCustomerCenter,
}: CustomerCenterProp) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseCustomerCenter}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>고객 센터</Title>
        <TextArea placeholder="문의 내용을 작성해 주세요."></TextArea>
        <Bottom>
          <CloseButton onClick={handleCloseCustomerCenter}>닫기</CloseButton>
          <SubmitButton $bgColor={SUB_COLOR}>문의하기</SubmitButton>
        </Bottom>
      </ModalInner>
    </Modal>
  );
}

export default CustomerCenter;
