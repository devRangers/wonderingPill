import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import { isWideDevice } from "@utils/isWideDevice";
import {
  Camera,
  Container,
  Description,
  DescriptionContainer,
  DescriptionContent,
  DescriptionFirstBox,
  DescriptionSecondBox,
  DescriptionTitle,
  FindWithImageContainer,
  ImageWrapper,
  Number,
  Title,
  TitleLine,
} from "./FindWithImage.style";
import CaptureGuideModal from "./CaptureGuideModal";
import Capture from "./Capture";

function FindWithImage() {
  const isWide = isWideDevice();
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    // 여기서 이제 일주일동안 안보이기 했는지 체크한다.
    // 현재는 일단 한번 뜨게 함
  }, []);

  return (
    <>
      <Container
        $headerHeight={HEADER_HEIGHT}
        $footerHeight={FOOTER_HEIGHT}
        $fullHeight={FULL_HEIGHT}>
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
              <Capture cameraOn={cameraOn} />
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
      <CaptureGuideModal />
    </>
  );
}

export default FindWithImage;
