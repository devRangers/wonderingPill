import Image from "next/image";
import { memo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdGroup } from "react-icons/md";
import { ACCENT_COLOR, SUB_COLOR } from "@utils/constant";
import {
  Container,
  Filter,
  InfoContainer,
  Text,
  Button,
  BtnContainer,
  LinkBtn,
} from "./InfoPage.style";

interface InfoPageContentProps {
  installModalOpenHandler: () => void;
  infoModalOpenHandler: () => void;
  teamModalOpenHandler: () => void;
}

function InfoPageContent({
  installModalOpenHandler,
  infoModalOpenHandler,
  teamModalOpenHandler,
}: InfoPageContentProps) {
  return (
    <Container>
      <Image
        src="/images/info/background.jpg"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <Filter $bgColor={ACCENT_COLOR} />
      <InfoContainer>
        <Text>
          약과 약국을 검색하고
          <br />
          나의 복용약을 관리하고 싶다면
        </Text>
        <Button $btnColor={SUB_COLOR} onClick={installModalOpenHandler}>
          궁금해약 설치하기
        </Button>
        <BtnContainer>
          <Image src="/images/info/logo.png" width="100" height="80" />
          <LinkBtn onClick={infoModalOpenHandler}>
            <AiOutlineInfoCircle />
            <br />
            서비스 소개
          </LinkBtn>
          <LinkBtn onClick={teamModalOpenHandler}>
            <MdGroup />
            <br />팀 소개
          </LinkBtn>
        </BtnContainer>
      </InfoContainer>
    </Container>
  );
}

export default memo(InfoPageContent);
