import React from "react";
import Modal from "@modal/Modal";
import {
  Bottom,
  CloseButton,
  IconWrapper,
  ModalInner,
  ModifyModalInner,
} from "./Modal.style";

interface ModifyProps {
  content: string;
  isOpenModal: boolean;
  handleCloseModifyResult: () => void;
  children: React.ReactNode
}

function Modify({
  content,
  isOpenModal,
  handleCloseModifyResult,
  children
}: ModifyProps) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseModifyResult}>
      <ModalInner>
        <ModifyModalInner>
          <IconWrapper>{children}</IconWrapper>
          <p>{content}</p>
        </ModifyModalInner>
        <Bottom>
          <CloseButton onClick={handleCloseModifyResult}>닫기</CloseButton>
        </Bottom>
      </ModalInner>
    </Modal>
  );
}

export default Modify;
