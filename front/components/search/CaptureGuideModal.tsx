import { useState } from "react";
import Image from "next/image";
import { MAIN_COLOR } from "@utils/constant";
import { isWideDevice } from "@utils/isWideDevice";
import {
  CloseBtn,
  CloseWeekendBtn,
  Guide,
  GuideDescriptionBox,
  GuideImageWrapper,
  GuideNumber,
  GuideTwoImageWrapper,
  ModalFooter,
  ModalGuideBox,
  ModalInner,
  ModalTitle,
  ModalTitleBox,
  OX,
  OXImage,
} from "./FindWithImage.style";
import Modal from "@modal/Modal";

function CaptureGuideModal() {
  const isWide = isWideDevice();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalInner>
        <ModalTitleBox>
          <ModalTitle>알약 촬영 가이드</ModalTitle>
        </ModalTitleBox>
        <ModalGuideBox>
          <GuideDescriptionBox $bgColor={MAIN_COLOR} $isWide={isWide}>
            <GuideNumber>1</GuideNumber>
            <Guide $isWide={isWide}>알약 문구가 잘 보이게 찍어주세요!</Guide>
          </GuideDescriptionBox>
          <GuideImageWrapper>
            <Image
              src="/images/register_logo.png"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </GuideImageWrapper>
        </ModalGuideBox>
        <ModalGuideBox>
          <GuideDescriptionBox $bgColor={MAIN_COLOR} $isWide={isWide}>
            <GuideNumber>2</GuideNumber>
            <Guide $isWide={isWide}>
              색깔이 잘 구분되도록 되도록 밝은 곳에서 촬영주세요!
            </Guide>
          </GuideDescriptionBox>
          <GuideTwoImageWrapper $isWide={isWide}>
            <OXImage $isWide={isWide}>
              <Image
                src="/images/register_logo.png"
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </OXImage>
            <OXImage $isWide={isWide}>
              <Image
                src="/images/register_logo.png"
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </OXImage>
            <OX>O</OX>
            <OX>X</OX>
          </GuideTwoImageWrapper>
        </ModalGuideBox>
        <ModalFooter>
          <CloseBtn onClick={() => setModalOpen(false)} $isWide={isWide}>
            닫기
          </CloseBtn>
          <CloseWeekendBtn onClick={() => setModalOpen(false)} $isWide={isWide}>
            일주일 동안 보지 않기
          </CloseWeekendBtn>
        </ModalFooter>
      </ModalInner>
    </Modal>
  );
}

export default CaptureGuideModal;
