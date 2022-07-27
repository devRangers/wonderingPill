import {
  MAIN_COLOR,
  ROUTE,
  SIDE_BAR_HEADER_HEIGHT,
  SUB_COLOR,
} from "@utils/constant";
import React from "react";
import {
  BackGround,
  BtnContainer,
  LoginBtn,
  SidebarBody,
  SidebarBtn,
  SidebarContainer,
  SidebarHeader,
} from "./Sidebar.style";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";

interface SidebarProp {
  openSideBar: boolean;
  closeSideBar: () => void;
}

interface ButtonTitleValues {
  title: string;
}

const ButtonTitle: { [key in string]: ButtonTitleValues } = {
  findWithPicture: {
    title: "사진으로 찾기",
  },
  findPharmacy: {
    title: "약국 찾기",
  },
  searchPill: {
    title: "시제품 약 검색",
  },
  searchSymptom: {
    title: "증상으로 검색",
  },
  healthChallenge: {
    title: "내 건강 캘린더",
  },
  myPage: {
    title: "마이페이지",
  },
  guide: {
    title: "설치 가이드",
  },
};

function Sidebar({ openSideBar, closeSideBar }: SidebarProp) {
  const handleCloseBae = () => {
    closeSideBar();
  };
  const router = useRouter();
  return (
    <>
      <BackGround $openSideBar={openSideBar} onClick={handleCloseBae} />
      <SidebarContainer $openSideBar={openSideBar}>
        <SidebarHeader $height={SIDE_BAR_HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
          <BsArrowLeftShort color={SUB_COLOR} onClick={handleCloseBae} />
        </SidebarHeader>
        <SidebarBody $height={SIDE_BAR_HEADER_HEIGHT}>
          <BtnContainer>
            {Object.entries(ButtonTitle).map(([key, value], index) => (
              <SidebarBtn key={key} $bgColor={MAIN_COLOR}>
                {value.title}
              </SidebarBtn>
            ))}
          </BtnContainer>
          <LoginBtn
            $bgColor={MAIN_COLOR}
            onClick={() => router.push(ROUTE.LOGIN.link)}>
            로그인
          </LoginBtn>
        </SidebarBody>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
