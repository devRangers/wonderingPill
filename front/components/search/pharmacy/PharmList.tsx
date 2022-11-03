import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import { useStyletron } from "styletron-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as Api from "@api";
import { pharmKeys } from "@utils/queryKey";
import { PHARMACY } from "@utils/endpoint";
import { PharmacySearchResponse as PharmacyValues } from "@modelTypes/pharmacySearchResponse";
import { PharmacyBookmarkListResponseDto as BookmarkResponse } from "@modelTypes/pharmacyBookmarkListResponseDto";
import { MAIN_COLOR } from "@utils/constant";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
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
  pharmList: PharmacyValues[];
}

const initialInfoValues: PharmacyValues = {
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

const getBookmarkIdKey = pharmKeys.getBookmarkId;

function PharmList({ pharmList }: PharmListProps) {
  const [css] = useStyletron();
  const temp = useMediaQuery({ query: "(min-height : 800px)" });
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const [isLong, setIsLong] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedPharmInfo, setSelectedPharmInfo] =
    useState<PharmacyValues>(initialInfoValues);
  const [bookmarkList, setBookmarkList] = useState<number[]>([]);

  useQuery(
    getBookmarkIdKey,
    () => Api.get<BookmarkResponse>(PHARMACY.BOOKMARKLIST),
    {
      enabled: !!user.name,
      onSuccess: ({ lists }) => {
        setBookmarkList(lists.PharmacyBookMark.map((item) => item.Pharmacy.id));
      },
    },
  );

  const bookmarkMutation = useMutation(
    (id: number) => Api.put(PHARMACY.BOOKMARK(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getBookmarkIdKey);
      },
    },
  );

  const selectPharmHandler = (info: PharmacyValues) => {
    setSelectedPharmInfo(info);
    setInfoModalOpen(true);
  };

  const bookmarkBtnClickHandler = (id: number) => {
    bookmarkMutation.mutate(id);
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
                {user.id && (
                  <IconBtn onClick={() => bookmarkBtnClickHandler(item.id)}>
                    {bookmarkList.includes(item.id) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </IconBtn>
                )}
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
