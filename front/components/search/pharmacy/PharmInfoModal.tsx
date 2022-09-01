import { MAIN_COLOR, GRAY_COLOR } from "@utils/constant";
import { BsFillTelephoneFill } from "react-icons/bs";
import { PharmacyResponse } from "@modelTypes/pharmacyResponse";
import {
  Container,
  TitleContainer,
  InfoContaniner,
  InfoTitle,
  InfoContent,
  CloseBtnContainer,
  CloseBtn,
} from "./PharmInfoModal.style";

interface PharmInfoModalProps {
  onClose: () => void;
  selectedPharmInfo: PharmacyResponse;
}

function PharmInfoModal({ onClose, selectedPharmInfo }: PharmInfoModalProps) {
  const { name, phone, address } = selectedPharmInfo;
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
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
          월요일 09:00~16:00 영업중
          <br />
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
