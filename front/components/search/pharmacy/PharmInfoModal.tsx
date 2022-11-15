import { MAIN_COLOR, GRAY_COLOR } from "@utils/constant";
import { BsFillTelephoneFill } from "react-icons/bs";
import { PharmacySearchResponse as PharmacyValues } from "@modelTypes/pharmacySearchResponse";
import {
  Container,
  TitleContainer,
  InfoContaniner,
  InfoTitle,
  InfoContent,
  CloseBtnContainer,
  CloseBtn,
} from "./PharmInfoModal.style";
import Schedule from "./Schedule";

interface PharmInfoModalProps {
  onClose: () => void;
  selectedPharmInfo: PharmacyValues;
}

function PharmInfoModal({ onClose, selectedPharmInfo }: PharmInfoModalProps) {
  const { id, name, phone, address, ...schedules } = selectedPharmInfo;

  return (
    <Container>
      <TitleContainer $bgColor={MAIN_COLOR}>{name}</TitleContainer>
      <InfoContaniner>
        <InfoTitle $bgColor={MAIN_COLOR}>주소</InfoTitle>
        <InfoContent $borderColor={MAIN_COLOR}>{address}</InfoContent>
      </InfoContaniner>
      <InfoContaniner>
        <InfoTitle $bgColor={MAIN_COLOR}>전화번호</InfoTitle>
        <InfoContent $borderColor={MAIN_COLOR}>
          <a href={`tel:${phone}`}>
            {phone} <BsFillTelephoneFill />
          </a>
        </InfoContent>
      </InfoContaniner>
      <InfoContaniner>
        <InfoTitle $bgColor={MAIN_COLOR}>영업시간</InfoTitle>
        <InfoContent $borderColor={MAIN_COLOR}>
          <Schedule schedules={schedules} />
        </InfoContent>
      </InfoContaniner>
      <CloseBtnContainer>
        <CloseBtn onClick={onClose} $btnColor={GRAY_COLOR}>
          닫기
        </CloseBtn>
      </CloseBtnContainer>
    </Container>
  );
}

export default PharmInfoModal;
