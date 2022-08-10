import Image from "next/image";
import {
  BUTTON_COLOR as BORDER_COLOR,
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import {
  Container,
  InnerContainer,
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

function MyPage() {
  return (
    <Container
      $bgColor={MAIN_COLOR}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <InnerContainer>
        <UserInfoContainer>
          <Profile>
            <Image
              src="/images/register_logo.png"
              alt="wondering-pill-logo"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </Profile>
          <UserInfo>
            <UserNameWrapper>
              <UserName $borderColor={BORDER_COLOR}>테스트 계정 님!</UserName>
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
      </InnerContainer>
    </Container>
  );
}

export default MyPage;
