import Image from "next/image";
import { useState, useEffect } from "react";
import { GRAY_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import {
  Container,
  CloseBtn,
  ImageContainer,
  BtnContainer,
  CategoryBtn,
  InfoContainer,
} from "./InstallModal.style";

interface InstallModalProps {
  onClose: () => void;
}

const categoryBtn = {
  android: {
    buttonText: "안드로이드에서 앱 설치 방법",
  },
  ios: {
    buttonText: "iOS에서 앱 설치 방법",
  },
  chrome: {
    buttonText: "크롬에서 앱 설치 방법",
  },
};

function InstallModal({ onClose }: InstallModalProps) {
  const [isCategoryBtnClicked, setIsCategoryBtnClicked] = useState(() => {
    const tempArr = Array(Object.keys(categoryBtn).length).fill(false);
    tempArr[0] = true;
    return tempArr;
  });

  const catrgoryBtnClickHandler = (idx: number) => {
    setIsCategoryBtnClicked(() => {
      const temp = Array(isCategoryBtnClicked.length).fill(false);
      temp[idx] = true;
      return temp;
    });
  };

  return (
    <Container>
      <CloseBtn onClick={onClose}>닫기</CloseBtn>
      <ImageContainer>
        <Image
          src="/images/header/logo.png"
          layout="fixed"
          width={150}
          height={50}
        />
      </ImageContainer>
      <BtnContainer>
        {Object.entries(categoryBtn).map(([key, value], idx) => (
          <CategoryBtn
            key={key}
            $btnColor={
              isCategoryBtnClicked[idx] ? SEMI_ACCENT_COLOR : GRAY_COLOR
            }
            onClick={() => catrgoryBtnClickHandler(idx)}>
            {value.buttonText}
          </CategoryBtn>
        ))}
      </BtnContainer>
      <InfoContainer $borderColor={SEMI_ACCENT_COLOR}>
        {
          Object.values(categoryBtn)[isCategoryBtnClicked.indexOf(true)]
            .buttonText
        }
      </InfoContainer>
    </Container>
  );
}

export default InstallModal;
