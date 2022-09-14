import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
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
} from "@infoComp/InfoPage.style";
import Modal from "@modal/Modal";
import InstallModal from "@infoComp/InstallModal";
import InfoModal from "@infoComp/InfoModal";
import TeamModal from "@infoComp/TeamModal";

const InfoPage: NextPage = () => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const modalCloseHandler = () => {
    setIsInstallModalOpen(false);
    setIsInfoModalOpen(false);
    setIsTeamModalOpen(false);
  };

  return (
    <>
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
          <Button
            $btnColor={SUB_COLOR}
            onClick={() => setIsInstallModalOpen(true)}>
            궁금해약 설치하기
          </Button>
          <BtnContainer>
            <Image src="/images/info/logo.png" width="100" height="80" />
            <LinkBtn onClick={() => setIsInfoModalOpen(true)}>
              <AiOutlineInfoCircle />
              <br />
              서비스 소개
            </LinkBtn>
            <LinkBtn onClick={() => setIsTeamModalOpen(true)}>
              <MdGroup />
              <br />팀 소개
            </LinkBtn>
          </BtnContainer>
        </InfoContainer>
      </Container>
      {(isInstallModalOpen || isInfoModalOpen || isTeamModalOpen) && (
        <Modal
          open={isInstallModalOpen || isInfoModalOpen || isTeamModalOpen}
          onClose={modalCloseHandler}>
          {(isInstallModalOpen && (
            <InstallModal onClose={() => setIsInstallModalOpen(false)} />
          )) ||
            (isInfoModalOpen && <InfoModal />) ||
            (isTeamModalOpen && <TeamModal />)}
        </Modal>
      )}
    </>
  );
};

export default InfoPage;
