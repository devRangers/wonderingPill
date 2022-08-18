import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@container/Container";
import Capture from "@capture/Capture";
import { MAIN_COLOR, SUB_COLOR } from "@utils/constant";
import {
  ContentClip,
  ContentContainer,
  InnerContainer,
  MedicineBadgeContainer,
  PharmarcyContainer,
  PharmarcyWrapper,
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
import Slider from "react-slick";
import { useStyletron } from "styletron-react";

interface pharmacyValues {
  name: "동방 약국";
  phnoeNumber: "010-0000-0000";
}

const medicinesName: { [key in string]: string } = {
  name1: "가스모틴정",
  name2: "가스모틴정_2",
  name3: "가스모틴정_3",
  name4: "가스모틴정_4",
};

const pharmacyData: { [key in string]: pharmacyValues } = {
  pharm_0: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
  pharm_1: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
  pharm_2: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
  pharm_3: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
  pharm_4: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
  pharm_5: {
    name: "동방 약국",
    phnoeNumber: "010-0000-0000",
  },
};

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};

function MyPage() {
  const [css] = useStyletron();
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
            <Slider
              {...settings}
              className={css({
                width: "70vw",
                height: "80%",
                maxWidth: "400px",
                margin: "0 auto",
                border: `1px solid ${MAIN_COLOR}`,
              })}>
              {Object.entries(pharmacyData).map(([key, value], index) => (
                <PharmarcyWrapper>
                  <Pharmarcy
                    name={value.name}
                    phoneNumber={value.phnoeNumber}
                  />
                </PharmarcyWrapper>
              ))}
            </Slider>
          </PharmarcyContainer>
        </ContentContainer>
      </InnerContainer>
    </Container>
  );
}

export default MyPage;
