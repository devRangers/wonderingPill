import Image from "next/image";
import { ACCENT_COLOR, SUB_COLOR } from "@utils/constant";
import {
  Container,
  ServiceNameContainer,
  ServiceName,
  FirstServiceInfo,
  TitleContainer,
  SubTitle,
  Title,
  Highlights,
  InfoContainer,
  ImageContainer,
  Description,
  SecondServiceInfo,
  CloseBtn,
  ContentContainer,
  Sources,
} from "./InfoModal.style";

interface InfoModalProps {
  onClose: () => void;
}

function InfoModal({ onClose }: InfoModalProps) {
  return (
    <Container>
      <ServiceNameContainer $bgColor={ACCENT_COLOR}>
        <ServiceName>궁금해약</ServiceName>
      </ServiceNameContainer>
      <FirstServiceInfo>
        <TitleContainer $align="end">
          <SubTitle>항상 약을 다 못 먹고 버리는 당신,</SubTitle>
          <Title>
            나만의 <Highlights $txtColor={ACCENT_COLOR}>매니저</Highlights>가
            필요하지 않으신가요?
          </Title>
        </TitleContainer>
        <InfoContainer>
          <ImageContainer $width="90%" $height="70%">
            <Image
              src="/images/service/pill.png"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <Description>
            궁금해약에서는,
            <br />
            복용하는 약의 정보를 제공하고
            <br />
            원하는 시간에{" "}
            <Highlights $txtColor={ACCENT_COLOR}>복약 알림</Highlights>을 받을
            수 있습니다.
          </Description>
        </InfoContainer>
        <InfoContainer>
          <Description>
            <Highlights $txtColor={ACCENT_COLOR}>지도</Highlights>에서 가까운
            약국을 찾고 영업시간을 확인할 수 있습니다.
            <br />
            또한 <Highlights $txtColor={ACCENT_COLOR}>북마크</Highlights>로
            약국을 저장하고
            <br /> 마이페이지에서 살펴볼 수 있습니다.
          </Description>
          <ImageContainer $width="90%" $height="70%">
            <Image
              src="/images/service/pharmacy.jpg"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
        </InfoContainer>
      </FirstServiceInfo>
      <SecondServiceInfo $bgColor={ACCENT_COLOR}>
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
        <ContentContainer>
          <TitleContainer $align="center">
            <SubTitle $white>집에 남은 약,</SubTitle>
            <Title $white>
              <Highlights $txtColor={SUB_COLOR}>무슨 약인지</Highlights> 몰라서
              <br />
              버리진 않으셨나요?
            </Title>
          </TitleContainer>
          <ImageContainer $width="100%" $height="80%">
            <Image
              src="/images/service/camera.png"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <Description $white>
            약의 특징을 <Highlights $txtColor={SUB_COLOR}>직접 입력</Highlights>
            하거나 <br />
            찍은 사진을 보고 <Highlights $txtColor={SUB_COLOR}>AI</Highlights>
            가 판별한 약의 특징으로
            <br />
            <Highlights $txtColor={SUB_COLOR}>궁금한 약</Highlights>을
            찾아보세요!
          </Description>
        </ContentContainer>
        <Sources>Pharmacy Image Designed by Freepik</Sources>
      </SecondServiceInfo>
    </Container>
  );
}

export default InfoModal;
