import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useStyletron } from "styletron-react";
import { MAIN_COLOR } from "@utils/constant";
import { PharmacyResponse } from "@modelTypes/pharmacyResponse";
import {
  PharmInfoContainer,
  PharmInfo,
  PharmName,
  PharmSubInfo,
  IconBtn,
} from "./SearchPharmPage.style";

interface PharmListProps {
  pharmList: PharmacyResponse[];
}

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  rows: 2,
};

function PharmList({ pharmList }: PharmListProps) {
  const [css] = useStyletron();
  return (
    <PharmInfoContainer>
      <Slider
        {...settings}
        className={css({
          border: "1px solid red",
          display: "flex",
          height: "auto",
        })}>
        {/* {pharmList.map((item, idx) => (
          <PharmInfo key={item.id} $borderColor={MAIN_COLOR}>
            <PharmName>{item.name}</PharmName>
            <PharmSubInfo>{item.phone}</PharmSubInfo>
            <IconBtn>like</IconBtn>
          </PharmInfo>
        ))} */}

        <PharmInfo key={1} $borderColor={MAIN_COLOR}>
          <PharmName>양재뿌리약국</PharmName>
          <PharmSubInfo>02-272-4561</PharmSubInfo>
          <IconBtn>like</IconBtn>
        </PharmInfo>
        <PharmInfo key={2} $borderColor={MAIN_COLOR}>
          <PharmName>양재뿌리약국</PharmName>
          <PharmSubInfo>02-272-4561</PharmSubInfo>
          <IconBtn>like</IconBtn>
        </PharmInfo>
        <PharmInfo key={3} $borderColor={MAIN_COLOR}>
          <PharmName>양재뿌리약국</PharmName>
          <PharmSubInfo>02-272-4561</PharmSubInfo>
          <IconBtn>like</IconBtn>
        </PharmInfo>
        <PharmInfo key={4} $borderColor={MAIN_COLOR}>
          <PharmName>양재뿌리약국</PharmName>
          <PharmSubInfo>02-272-4561</PharmSubInfo>
          <IconBtn>like</IconBtn>
        </PharmInfo>
      </Slider>
    </PharmInfoContainer>
  );
}

export default PharmList;
