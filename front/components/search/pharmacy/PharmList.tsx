import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "styletron-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery, useMutation } from "react-query";
import * as Api from "@api";
import { PharmacyResponse } from "@modelTypes/pharmacyResponse";
import { MAIN_COLOR } from "@utils/constant";
import {
  PharmInfoContainer,
  PharmInfo,
  PharmName,
  PharmSubInfo,
  IconBtn,
} from "./SearchPharmPage.style";
import Modal from "@modal/Modal";
import PharmInfoModal from "./PharmInfoModal";

interface PharmListProps {
  pharmList: PharmacyResponse[];
}

const initialInfoValues: PharmacyResponse = {
  id: 0,
  name: "",
  phone: "",
  address: "",
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
  holiday: "",
};

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  rows: 2,
  adaptiveHeight: true,
};

function PharmList({ pharmList }: PharmListProps) {
  const [css] = useStyletron();
  const temp = useMediaQuery({ query: "(min-height : 800px)" });

  const [isLong, setIsLong] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedPharmInfo, setSelectedPharmInfo] =
    useState<PharmacyResponse>(initialInfoValues);

  const selectPharmHandler = (info: PharmacyResponse) => {
    setSelectedPharmInfo(info);
    setInfoModalOpen(true);
  };

  useEffect(() => {
    setIsLong(temp);
  }, [isLong]);

  return (
    <>
      <PharmInfoContainer $isLong={isLong}>
        <Slider
          {...settings}
          className={css({
            height: "90%",
          })}>
          {pharmList.map((item) => (
            <div key={item.id}>
              <PharmInfo $borderColor={MAIN_COLOR} $isLong={isLong}>
                <PharmName onClick={() => selectPharmHandler(item)}>
                  {item.name}
                </PharmName>
                <IconBtn></IconBtn>
                <PharmSubInfo>{item.phone}</PharmSubInfo>
              </PharmInfo>
            </div>
          ))}
        </Slider>
      </PharmInfoContainer>
      {infoModalOpen && (
        <Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
          <PharmInfoModal
            selectedPharmInfo={selectedPharmInfo}
            onClose={() => setInfoModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default PharmList;
