import { useEffect, useState } from "react";
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
  ImageDescription,
  PillImage,
} from "./FindWithImage.style";
import { setCookie } from "@utils/cookie";

interface CaptureGuideModalProp {
  handleCloseModal: () => void;
}

function CaptureGuideModal({ handleCloseModal }: CaptureGuideModalProp) {
  const isWide = isWideDevice();

  const handleClickHideModalOneWeek = () => {
    setCookie("1week", "1week", {
      path: "/",
      maxAge: 60 * 10,
      secure: true,
      httpOnly: true,
    });
    handleCloseModal();
  };

  return (
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
            src="/images/search/image/rightImage.png"
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
            색깔이 잘 구분되게 되도록 밝은 곳에서 촬영해주세요!
          </Guide>
        </GuideDescriptionBox>
        <GuideTwoImageWrapper $isWide={isWide}>
          <PillImage $isWide={isWide}>
            <Image
              src="/images/search/image/brightImage.png"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </PillImage>
          <PillImage $isWide={isWide}>
            <Image
              src="/images/search/image/darkImage.png"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </PillImage>
          <ImageDescription>O</ImageDescription>
          <ImageDescription>X</ImageDescription>
        </GuideTwoImageWrapper>
      </ModalGuideBox>
      <ModalFooter>
        <CloseBtn onClick={handleCloseModal} $isWide={isWide}>
          닫기
        </CloseBtn>
        <CloseWeekendBtn onClick={handleClickHideModalOneWeek} $isWide={isWide}>
          일주일 동안 보지 않기
        </CloseWeekendBtn>
      </ModalFooter>
    </ModalInner>
  );
}

export default CaptureGuideModal;
