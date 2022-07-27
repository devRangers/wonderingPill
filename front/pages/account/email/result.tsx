import type { NextPage } from "next";
import { isWideDevice } from "@utils/isWideDevice";
import { MAIN_COLOR, SUB_COLOR, BUTTON_COLOR } from "@utils/constant";
import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  ResultContainer,
  Description,
  ResultBox,
  InfoContaniner,
  InfoTitle,
  BtnContainer,
  LinkButton,
} from "@accountComp/result/Result.style";

const FindEmailResultPage: NextPage = () => {
  const isWide = isWideDevice();

  return (
    <Container $bgColor={MAIN_COLOR}>
      <TitleContainer>
        <Title $txtColor={SUB_COLOR}>계정 찾기</Title>
        <SubTitle>회원님의 계정 찾기가 완료되었습니다.</SubTitle>
      </TitleContainer>
      <ResultContainer>
        <Description>
          다음 정보로 가입된 계정이
          <br /> 총 1개 있습니다.
        </Description>
        <ResultBox $isWide={isWide}>
          <InfoContaniner $isWide={isWide}>
            <InfoTitle>이름</InfoTitle>
            <p>테스트계정</p>
          </InfoContaniner>
          <InfoContaniner $isWide={isWide}>
            <InfoTitle>계정</InfoTitle>
            <p>sujeong9158@gmail.com</p>
          </InfoContaniner>
        </ResultBox>
      </ResultContainer>
      <BtnContainer $isWide={isWide}>
        <LinkButton $isWide={isWide} $btnColor={BUTTON_COLOR}>
          로그인 바로가기
        </LinkButton>
        <LinkButton $isWide={isWide} $btnColor={BUTTON_COLOR}>
          비밀번호 찾기
        </LinkButton>
      </BtnContainer>
    </Container>
  );
};

export default FindEmailResultPage;
