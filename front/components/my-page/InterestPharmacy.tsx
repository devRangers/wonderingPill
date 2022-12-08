import {
  ContentClip,
  ContentContainer,
  PharmarcyContainer,
} from "./MyPage.style";
import Pharmarcy from "./pharmarcy/Pharmarcy";
import { LIGHT_GRAY_COLOR, MAIN_COLOR, SUB_COLOR } from "@utils/constant";
import Slider from "react-slick";
import { useStyletron } from "styletron-react";

interface pharmacyValues {
  name: string;
  phoneNumber: string;
}

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};

const pharmacyData: { [key in string]: pharmacyValues } = {
  pharm_0: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
  pharm_1: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
  pharm_2: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
  pharm_3: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
  pharm_4: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
  pharm_5: {
    name: "동방 약국",
    phoneNumber: "010-0000-0000",
  },
};

function InterestPharmacy() {
  const [css] = useStyletron();

  return (
    <ContentContainer $borderColor={SUB_COLOR} $bgColor={LIGHT_GRAY_COLOR}>
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
          {Object.entries(pharmacyData).map(([key, value]) => (
            <Pharmarcy
              key={key}
              name={value.name}
              phoneNumber={value.phoneNumber}
            />
          ))}
        </Slider>
      </PharmarcyContainer>
    </ContentContainer>
  );
}

export default InterestPharmacy;
