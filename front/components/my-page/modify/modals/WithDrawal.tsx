import React from "react";
import Modal from "@modal/Modal";
import { ACCENT_COLOR, ERROR_MSG_COLOR } from "@utils/constant";
import {
  Bottom,
  CloseButton,
  ModalInner,
  SubmitButton,
  TextContainer,
  Title,
} from "./Modal.style";

interface WithDrawlProp {
  isOpenModal: boolean;
  handleCloseWithDrawl: () => void;
  handleOpenSuccessWithDrawal: () => void;
}

function WithDrawl({
  isOpenModal,
  handleCloseWithDrawl,
  handleOpenSuccessWithDrawal,
}: WithDrawlProp) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleCloseWithDrawl();
      handleOpenSuccessWithDrawal();

      // 회원 탈퇴 로직
    } catch (e) {}
  };
  return (
    <Modal open={isOpenModal} onClose={handleCloseWithDrawl}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>회원 탈퇴</Title>
        <TextContainer>
          <p>사용하고 계신 이메일은 복구나 재사용이 불가능합니다.</p>
          <p>회월탈퇴 시 개인정보 및 모든 데이터는 삭제됩니다.</p>
        </TextContainer>
        <Bottom>
          <CloseButton onClick={handleCloseWithDrawl}>닫기</CloseButton>
          <form onSubmit={handleSubmit}>
            <SubmitButton $bgColor={ERROR_MSG_COLOR}>회원탈퇴</SubmitButton>
          </form>
        </Bottom>
      </ModalInner>
    </Modal>
  );
}

export default WithDrawl;
