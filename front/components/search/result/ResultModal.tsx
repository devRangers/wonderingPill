import Modal from "@modal/Modal";
import { MAIN_COLOR, SUB_COLOR } from "@utils/constant";
import {
  ModalInnerContainer,
  ModalTopContainer,
  ModalTitleWrapper,
  ModalSubTitleWrapper,
  ModalTitle,
  ModalSubTitle,
  ModalContentContainer as ModalCautionContainer,
  ModalContentContainer as ModalInteractionContainer,
  ModalContentTitle as ModalCaution,
  ModalContentTitle as ModalInteraction,
  ModalContent as ModalCautionContent,
  ModalContent as ModalInteractionContent,
  ModalBottom,
  CloseModalBtn,
  ModalContentScroll,
} from "./Result.style";

interface ResultModalProps {
  modalOpen: boolean;
  handleModalOpen: (open: boolean) => void;
}

function ResultModal({ modalOpen, handleModalOpen }: ResultModalProps) {
  const tempModalData: { [key in string]: string } = {
    cautionContent:
      "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
    interactionContent:
      "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  };
  return (
    <Modal open={modalOpen} onClose={() => handleModalOpen(false)}>
      <ModalInnerContainer>
        <ModalTopContainer>
          <ModalTitleWrapper>
            <ModalTitle $color={SUB_COLOR}>복용시 주의사항</ModalTitle>
          </ModalTitleWrapper>
          <ModalSubTitleWrapper>
            <ModalSubTitle>반드시 약사와의 상담 후 복용해주세요!</ModalSubTitle>
          </ModalSubTitleWrapper>
        </ModalTopContainer>
        <ModalCautionContainer>
          <ModalCaution $bgColor={MAIN_COLOR}>주의사항</ModalCaution>
          <ModalCautionContent $borderColor={MAIN_COLOR}>
            <ModalContentScroll $scrollColor={MAIN_COLOR}>
              {tempModalData.cautionContent}
            </ModalContentScroll>
          </ModalCautionContent>
        </ModalCautionContainer>
        <ModalInteractionContainer>
          <ModalInteraction $bgColor={MAIN_COLOR}>상호작용</ModalInteraction>
          <ModalInteractionContent $borderColor={MAIN_COLOR}>
            <ModalContentScroll $scrollColor={MAIN_COLOR}>
              {tempModalData.interactionContent}
            </ModalContentScroll>
          </ModalInteractionContent>
        </ModalInteractionContainer>
        <ModalBottom>
          <CloseModalBtn onClick={() => handleModalOpen(false)}>
            닫기
          </CloseModalBtn>
        </ModalBottom>
      </ModalInnerContainer>
    </Modal>
  );
}

export default ResultModal;
