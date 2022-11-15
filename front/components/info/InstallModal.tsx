import Image from "next/image";
import { useState } from "react";
import { GRAY_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import { INSTALL_CATEGORIES } from "@installContainer/constant";
import {
  Container,
  CloseBtn,
  ImageContainer,
  BtnContainer,
  CategoryBtn,
  InfoContainer,
} from "./InstallModal.style";
import InstallDescription from "@installContainer/InstallDescription";

interface InstallModalProps {
  onClose: () => void;
}

function InstallModal({ onClose }: InstallModalProps) {
  const [isCategoryBtnClicked, setIsCategoryBtnClicked] = useState(() => {
    const tempArr = Array(Object.keys(INSTALL_CATEGORIES).length).fill(false);
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
        {Object.entries(INSTALL_CATEGORIES).map(([key, value], idx) => (
          <CategoryBtn
            key={key}
            $btnColor={
              isCategoryBtnClicked[idx] ? SEMI_ACCENT_COLOR : GRAY_COLOR
            }
            onClick={() => catrgoryBtnClickHandler(idx)}>
            {value}
          </CategoryBtn>
        ))}
      </BtnContainer>
      <InfoContainer $borderColor={SEMI_ACCENT_COLOR}>
        <InstallDescription
          category={
            Object.keys(INSTALL_CATEGORIES)[isCategoryBtnClicked.indexOf(true)]
          }
        />
      </InfoContainer>
    </Container>
  );
}

export default InstallModal;
