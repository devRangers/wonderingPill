import { useEffect, useState } from "react";
import Image from "next/image";
import { FOOTER_HEIGHT, HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import { isWideDevice } from "@utils/isWideDevice";
import {
  Camera,
  CloseBtn,
  CloseWeekendBtn,
  Container,
  Description,
  DescriptionContainer,
  DescriptionContent,
  DescriptionFirstBox,
  DescriptionSecondBox,
  DescriptionTitle,
  FindWithImageContainer,
  Guide,
  GuideDescriptionBox,
  GuideImageWrapper,
  GuideNumber,
  GuideTwoImageWrapper,
  ImageWrapper,
  ModalFooter,
  ModalGuideBox,
  ModalInner,
  ModalTitle,
  ModalTitleBox,
  Number,
  OX,
  OXImage,
  Title,
  TitleLine,
} from "./FindWithImage.style";
import Modal from "@modal/Modal";

function FindWithImage() {
  const isWide = isWideDevice();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    // 여기서 이제 일주일동안 안보이기 했는지 체크한다.
    // 현재는 일단 한번 뜨게 함
  }, []);

  return (
    <>
      <Container $headerHeight={HEADER_HEIGHT} $footerHeight={FOOTER_HEIGHT}>
        <FindWithImageContainer $bgColor={MAIN_COLOR} $isWide={isWide}>
          <Camera $bgColor={MAIN_COLOR} $isWide={isWide}>
            <ImageWrapper>
              <Image
                src="/images/register_logo.png"
                layout="fill"
                objectFit="contain"
                style={{
                  borderRadius: "50%",
                }}
                priority={true}
              />
            </ImageWrapper>
          </Camera>
          <DescriptionContainer $isWide={isWide}>
            <Description $isWide={isWide}>
              <DescriptionTitle>
                <TitleLine $bgColor={MAIN_COLOR} />
                <Title>사진으로 찾기 이용 방법</Title>
              </DescriptionTitle>
              <DescriptionFirstBox $bgColor={MAIN_COLOR}>
                <Number>1</Number>
                <DescriptionContent>
                  위 일러스트를 클릭하고 알고 싶은 알약 사진을 찍으세요!
                </DescriptionContent>
              </DescriptionFirstBox>
              <DescriptionSecondBox $bgColor={MAIN_COLOR}>
                <Number>2</Number>
                <DescriptionContent>
                  머신러닝으로 알아낸 알약 이름과
                  <br /> 성분 등을 알아보세요!
                </DescriptionContent>
              </DescriptionSecondBox>
            </Description>
          </DescriptionContainer>
        </FindWithImageContainer>
      </Container>
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
            <CloseBtn onClick={() => setModalOpen(false)}>닫기</CloseBtn>
            <CloseWeekendBtn onClick={() => setModalOpen(false)}>
              일주일 동안 보지 않기
            </CloseWeekendBtn>
          </ModalFooter>
        </ModalInner>
      </Modal>
    </>
  );
}

export default FindWithImage;
