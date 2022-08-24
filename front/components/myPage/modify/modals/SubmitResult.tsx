import React from "react";
import Modal from "@modal/Modal";
import {
  Bottom,
  CloseButton,
  ModalInner,
  TextContainer,
  Title,
} from "./Modal.style";
import { ACCENT_COLOR } from "@utils/constant";

interface SubmitResultProp {
  title: string;
  contents: string[];
  isOpenModal: boolean;
  handleCloseSubmitResult: () => void;
}

function SubmitResult({
  title,
  contents,
  isOpenModal,
  handleCloseSubmitResult,
}: SubmitResultProp) {
  return (
    <Modal open={isOpenModal} onClose={handleCloseSubmitResult}>
      <ModalInner>
        <Title $color={ACCENT_COLOR}>{title}</Title>
        <TextContainer>
          {contents.map((content, index) => (
            <p key={`modal content ${index}`}>{content}</p>
          ))}
        </TextContainer>
        <Bottom>
          <CloseButton onClick={handleCloseSubmitResult}>닫기</CloseButton>
        </Bottom>
      </ModalInner>
    </Modal>
  );
}

export default SubmitResult;
