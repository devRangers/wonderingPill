import React, { useState } from "react";
import Modal from "@modal/Modal";
import { ACCENT_COLOR, SUB_COLOR } from "@utils/constant";
import {
  Bottom,
  CloseButton,
  TextArea,
  SubmitButton,
  Title,
  CustomerCenterModalInner,
  Form,
} from "./Modal.style";

interface CustomerCenterProp {
  isOpenModal: boolean;
  handleCloseCustomerCenter: () => void;
  handleOpenSuccessInquiry: () => void;
}

function CustomerCenter({
  isOpenModal,
  handleCloseCustomerCenter,
  handleOpenSuccessInquiry,
}: CustomerCenterProp) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleCloseCustomerCenter();
      handleOpenSuccessInquiry();
    } catch (e) {}
  };
  return (
    <Modal open={isOpenModal} onClose={handleCloseCustomerCenter}>
      <CustomerCenterModalInner>
        <Title $color={ACCENT_COLOR}>고객 센터</Title>
        <Form onSubmit={handleSubmit}>
          <TextArea placeholder="문의 내용을 작성해 주세요."></TextArea>
          <Bottom>
            <CloseButton onClick={handleCloseCustomerCenter}>닫기</CloseButton>
            <SubmitButton type="submit" $bgColor={SUB_COLOR}>
              문의하기
            </SubmitButton>
          </Bottom>
        </Form>
      </CustomerCenterModalInner>
    </Modal>
  );
}

export default CustomerCenter;
