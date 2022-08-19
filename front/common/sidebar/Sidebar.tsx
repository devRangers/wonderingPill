import { useRouter } from "next/router";
import {
  FULL_HEIGHT,
  MAIN_COLOR,
  ROUTE,
  SIDE_BAR_HEADER_HEIGHT,
  ACCENT_COLOR,
} from "@utils/constant";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  BackArrow,
  BackGround,
  BtnContainer,
  LoginBtn,
  SidebarBody,
  SidebarBtn,
  SidebarContainer,
  SidebarHeader,
} from "./Sidebar.style";

interface SidebarProp {
  openSideBar: boolean;
  closeSideBar: () => void;
}

interface ButtonTitleValues {
  title: string;
  link: string;
}

const ButtonTitle: { [key in string]: ButtonTitleValues } = {
  findWithPicture: {
    title: "사진으로 찾기",
    link: ROUTE.SEARCH_IMAGE,
  },
  findPharmacy: {
    title: "약국 찾기",
    link: ROUTE.MAIN,
  },
  searchPill: {
    title: "시제품 약 검색",
    link: ROUTE.MAIN,
  },
  searchSymptom: {
    title: "증상으로 검색",
    link: ROUTE.MAIN,
  },
  healthChallenge: {
    title: "내 건강 캘린더",
    link: ROUTE.MAIN,
  },
  myPage: {
    title: "마이페이지",
    link: ROUTE.MAIN,
  },
  guide: {
    title: "설치 가이드",
    link: ROUTE.MAIN,
  },
};

function Sidebar({ openSideBar, closeSideBar }: SidebarProp) {
  const router = useRouter();

  const handleClickBtn = (url: string) => {
    closeSideBar();
    router.push(url);
  };
  return (
    <>
      <BackGround
        $openSideBar={openSideBar}
        $fullHeight={FULL_HEIGHT}
        onClick={closeSideBar}
      />
      <SidebarContainer $openSideBar={openSideBar} $fullHeight={FULL_HEIGHT}>
        <SidebarHeader $height={SIDE_BAR_HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
          <BackArrow onClick={closeSideBar}>
            <BsArrowLeftShort color={ACCENT_COLOR} />
          </BackArrow>
        </SidebarHeader>
        <SidebarBody $height={SIDE_BAR_HEADER_HEIGHT} $fullHeight={FULL_HEIGHT}>
          <BtnContainer>
            {Object.entries(ButtonTitle).map(([key, value]) => (
              <SidebarBtn
                key={key}
                $bgColor={MAIN_COLOR}
                onClick={() => handleClickBtn(value.link)}>
                {value.title}
              </SidebarBtn>
            ))}
          </BtnContainer>
          <LoginBtn
            $bgColor={MAIN_COLOR}
            onClick={() => router.push(ROUTE.LOGIN)}>
            로그인
          </LoginBtn>
        </SidebarBody>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
