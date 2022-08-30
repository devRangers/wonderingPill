import React from "react";
import Modal from "@modal/Modal";
import {
  Bottom,
  CloseButton,
  ModalInner,
  ModifyModalInner,
} from "./Modal.style";

interface ModifyProps {
  content: string;
  isOpenModal: boolean;
  handleCloseModifyResult: () => void;
}

function Modify({
  content,
  isOpenModal,
  handleCloseModifyResult,
}: ModifyProps) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseModifyResult}>
      <ModalInner>
        <ModifyModalInner>
          <div></div>
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
