import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as Api from "@api";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";
import { FindAccountResponseUser as InfoType } from "@modelTypes/findAccountResponseUser";
import { isWideDevice } from "@utils/isWideDevice";
import {
  MAIN_COLOR,
  ACCENT_COLOR,
  SUB_COLOR,
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

const FindEmailResultPage: NextPage = ({ name, email }: InfoType) => {
  const router = useRouter();
  const isWide = isWideDevice();

  return (
    <Container $bgColor={MAIN_COLOR} $fullHeight={FULL_HEIGHT}>
      <TitleContainer>
        <Title $txtColor={ACCENT_COLOR}>계정 찾기</Title>
        <SubTitle>회원님의 계정 찾기가 완료되었습니다.</SubTitle>
      </TitleContainer>

      <ResultContainer>
        <Description>
          다음 정보로 가입된 계정이
          <br /> 총 {!!name ? 1 : 0}개 있습니다.
        </Description>

        <ResultBox $isWide={isWide} $isDivide={!!name}>
          {!!name ? (
            <>
              <InfoContaniner $isWide={isWide}>
                <InfoTitle>이름</InfoTitle>
                <p>{name}</p>
              </InfoContaniner>
              <InfoContaniner $isWide={isWide}>
                <InfoTitle>계정</InfoTitle>
                <p>{email}</p>
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

        {!name && (
          <LinkButton
            $isWide={isWide}
            $btnColor={SUB_COLOR}
            onClick={() => router.push(ROUTE.REGISTER)}>
            회원가입 바로가기
          </LinkButton>
        )}
      </ResultContainer>

      <BtnContainer $isWide={isWide}>
        <LinkButton
          $isWide={isWide}
          $btnColor={SUB_COLOR}
          onClick={() =>
            router.push(
              {
                pathname: ROUTE.LOGIN,
                query: {
                  email: email,
                },
              },
              ROUTE.LOGIN,
            )
          }>
          로그인 바로가기
        </LinkButton>

        <LinkButton
          $isWide={isWide}
          $btnColor={SUB_COLOR}
          onClick={() => router.push(ROUTE.PASSWORD_FIND)}>
          비밀번호 찾기
        </LinkButton>
      </BtnContainer>
    </Container>
  );
};

export default FindEmailResultPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  const { user } = await Api.get<FindAccountResponse>(
    `/auth/find-account/${userId}`,
  );
  return {
    props: user,
  };
};
