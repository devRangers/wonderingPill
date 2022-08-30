import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { MAIN_COLOR, ROUTE, SUB_COLOR } from "@utils/constant";
import {
  BottomContainer,
  ContentClip,
  ContentContainer,
  MedicineBadgeContainer,
  ModifyUserDataButton,
  PharmarcyContainer,
} from "./MyPage.style";
import Slider from "react-slick";
import Template from "./Template";
import Medicine from "./medicine/Medicine";
import Pharmarcy from "./pharmarcy/Pharmarcy";
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
  name5: "가스모틴정_5",
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
  const router = useRouter();
  const [css] = useStyletron();
  const handleClick = () => {
    router.push({
      pathname: ROUTE.MY_PAGE_MODIFY,
    });
  };
  return (
    <Template gridTemplateRows="1fr 1.4fr 1.5fr 0.5fr">
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
              margin: "auto",
              border: `1px solid ${MAIN_COLOR}`,
            })}>
            {Object.entries(pharmacyData).map(([key, value], index) => (
              <Pharmarcy
                key={key}
                name={value.name}
                phoneNumber={value.phnoeNumber}
              />
            ))}
          </Slider>
        </PharmarcyContainer>
      </ContentContainer>
      <BottomContainer>
        <ModifyUserDataButton onClick={handleClick}>
          개인정보수정
        </ModifyUserDataButton>
      </BottomContainer>
    </Template>
  );
}

export default MyPage;
