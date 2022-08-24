import Modal from "@modal/Modal";
import { ACCENT_COLOR, SUB_COLOR } from "@utils/constant";
import React, { useState } from "react";
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
  handleCloseustomerCenter: () => void;
}

function CustomerCenter({
  isOpenModal,
  handleCloseustomerCenter,
}: CustomerCenterProp) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseustomerCenter}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>고객 센터</Title>
        <TextArea placeholder="문의 내용을 300자 이내로 작성해 주세요."></TextArea>
        <Bottom>
          <CloseButton onClick={handleCloseustomerCenter}>닫기</CloseButton>
          <SubmitButton $bgColor={SUB_COLOR}>문의하기</SubmitButton>
        </Bottom>
      </ModalInner>
    </Modal>
  );
}

export default CustomerCenter;
