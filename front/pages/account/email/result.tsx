import type { NextPage } from "next";
import { useRouter } from "next/router";
import { isWideDevice } from "@utils/isWideDevice";
import {
  MAIN_COLOR,
  SUB_COLOR,
  BUTTON_COLOR,
  ROUTE,
  FULL_HEIGHT,
} from "@utils/constant";
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
  NoResultMsg,
  BtnContainer,
  LinkButton,
} from "@accountComp/result/Result.style";

interface InfoType {
  name: string;
  email: string;
}

const fakeData: InfoType[] = [
  {
    name: "테스트계정",
    email: "jiyu@test.com",
  },
];

const FindEmailResultPage: NextPage = () => {
  const router = useRouter();
  const isWide = isWideDevice();

  return (
    <Container $bgColor={MAIN_COLOR} $fullHeight={FULL_HEIGHT}>
      <TitleContainer>
        <Title $txtColor={SUB_COLOR}>계정 찾기</Title>
        <SubTitle>회원님의 계정 찾기가 완료되었습니다.</SubTitle>
      </TitleContainer>

      <ResultContainer>
        <Description>
          다음 정보로 가입된 계정이
          <br /> 총 {fakeData.length}개 있습니다.
        </Description>

        <ResultBox $isWide={isWide} $isDivide={fakeData.length > 0}>
          {fakeData.length > 0 ? (
            <>
              <InfoContaniner $isWide={isWide}>
                <InfoTitle>이름</InfoTitle>
                <p>{fakeData[0].name}</p>
              </InfoContaniner>
              <InfoContaniner $isWide={isWide}>
                <InfoTitle>계정</InfoTitle>
                <p>{fakeData[0].email}</p>
              </InfoContaniner>
            </>
          ) : (
            <NoResultMsg>
              계정을 찾지 못했습니다.
              <br />
              회원이 아니라면 회원가입을 해 주세요.
            </NoResultMsg>
          )}
        </ResultBox>

        {fakeData.length === 0 && (
          <LinkButton
            $isWide={isWide}
            $btnColor={BUTTON_COLOR}
            onClick={() => router.push(ROUTE.REGISTER)}>
            회원가입 바로가기
          </LinkButton>
        )}
      </ResultContainer>

      <BtnContainer $isWide={isWide}>
        <LinkButton
          $isWide={isWide}
          $btnColor={BUTTON_COLOR}
          onClick={() =>
            router.push(
              {
                pathname: ROUTE.LOGIN,
                query: {
                  email: fakeData[0].email,
                },
              },
              ROUTE.LOGIN,
            )
          }>
          로그인 바로가기
        </LinkButton>

        <LinkButton
          $isWide={isWide}
          $btnColor={BUTTON_COLOR}
          onClick={() => router.push(ROUTE.PASSWORD_FIND)}>
          비밀번호 찾기
        </LinkButton>
      </BtnContainer>
    </Container>
  );
};

export default FindEmailResultPage;
