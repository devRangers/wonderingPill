import React from "react";
import {
  DescriptionContainer,
  DescriptionContent,
  Description as Descript,
  DescriptionBox,
  DescriptionTitle,
  Numbering,
  Title,
  TitleLine,
} from "./Search.style";
import { isWideDevice } from "@utils/isWideDevice";
import { MAIN_COLOR } from "@utils/constant";

function Description() {
  const isWide = isWideDevice();
  return (
    <DescriptionContainer>
      <Descript $isWide={isWide}>
        <DescriptionTitle>
          <TitleLine $bgColor={MAIN_COLOR} />
          <Title>사진으로 찾기 이용 방법</Title>
        </DescriptionTitle>
        <DescriptionBox $bgColor={MAIN_COLOR}>
          <Numbering>1</Numbering>
          <DescriptionContent>
            위 일러스트를 클릭하고 알고 싶은 알약 사진을 찍으세요!
          </DescriptionContent>
        </DescriptionBox>
        <DescriptionBox $bgColor={MAIN_COLOR}>
          <Numbering>2</Numbering>
          <DescriptionContent>
            머신러닝으로 알아낸 알약 이름과
            <br /> 성분 등을 알아보세요!
          </DescriptionContent>
        </DescriptionBox>
      </Descript>
    </DescriptionContainer>
  );
}

export default Description;
