import Capture from "@capture/Capture";
import Container from "@container/Container";
import { SUB_COLOR } from "@utils/constant";
import React from "react";
import {
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

interface TemplateProp {
  children: React.ReactNode;
  gridTemplateRows: string;
}

function Template({ children, gridTemplateRows }: TemplateProp) {
  return (
    <Container>
      <InnerContainer $gridTemplateRows={gridTemplateRows}>
        <UserInfoContainer>
          <Profile>
            <Capture />
          </Profile>
          <UserInfo>
            <UserNameWrapper>
              <UserName $borderColor={SUB_COLOR}>테스트 계정 님!</UserName>
              <SocialLoginState>카카오 로그인</SocialLoginState>
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
        {children}
      </InnerContainer>
    </Container>
  );
}

export default Template;
