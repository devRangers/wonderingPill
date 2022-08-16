import Container from "@container/Container";
import Capture from "@capture/Capture";
import { SUB_COLOR } from "@utils/constant";
import {
  ContentClip,
  ContentContainer,
  InnerContainer,
  MedicineBadgeContainer,
  PharmarcyContainer,
  Profile,
  SocialLoginState,
  UserInfo,
  UserInfoContainer,
  UserInfoItem,
  UserInfoItemCount,
  UserName,
  UserNameWrapper,
  UserState,
  UserStateWrapper,
} from "./MyPage.style";
import Medicine from "./medicine/Medicine";
import Pharmarcy from "./pharmarcy/Pharmarcy";

const medicinesName: { [key in string]: string } = {
  name1: "가스모틴정",
  name2: "가스모틴정_2",
  name3: "가스모틴정_3",
  name4: "가스모틴정_4",
};

function MyPage() {
  return (
    <Container>
      <InnerContainer>
        <UserInfoContainer>
          <Profile>
            <Capture />
          </Profile>
          <UserInfo>
            <UserNameWrapper>
              <UserName $borderColor={SUB_COLOR}>테스트 계정 님!</UserName>
              <SocialLoginState>카카오로그인</SocialLoginState>
            </UserNameWrapper>
            <UserStateWrapper>
              <UserState>
                <UserInfoItemCount>5</UserInfoItemCount>
                <UserInfoItem>복용약</UserInfoItem>
              </UserState>
              <UserState>
                <UserInfoItemCount>5</UserInfoItemCount>
                <UserInfoItem>복용약</UserInfoItem>
              </UserState>
              <UserState>
                <UserInfoItemCount>5</UserInfoItemCount>
                <UserInfoItem>복용약</UserInfoItem>
              </UserState>
            </UserStateWrapper>
          </UserInfo>
        </UserInfoContainer>
        <ContentContainer $borderColor={SUB_COLOR}>
          <ContentClip $bgColor={SUB_COLOR}>복용약</ContentClip>
          <MedicineBadgeContainer>
            {Object.entries(medicinesName).map(([key, value], index) => (
              <Medicine key={key} name={value} />
            ))}
          </MedicineBadgeContainer>
        </ContentContainer>
        <ContentContainer $borderColor={SUB_COLOR}>
          <ContentClip $bgColor={SUB_COLOR}>관심 약국</ContentClip>
          <PharmarcyContainer>
            <Pharmarcy />
            <Pharmarcy />
          </PharmarcyContainer>
        </ContentContainer>
      </InnerContainer>
    </Container>
  );
}

export default MyPage;
