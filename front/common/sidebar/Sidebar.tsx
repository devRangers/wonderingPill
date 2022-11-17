import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  FULL_HEIGHT,
  MAIN_COLOR,
  ROUTE,
  SIDE_BAR_HEADER_HEIGHT,
  ACCENT_COLOR,
} from "@utils/constant";
import { AUTH } from "@utils/endpoint";
import { get } from "@api";
import { userAtom } from "@atom/userAtom";
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
import { useAtom } from "jotai";

interface SidebarProp {
  openSideBar: boolean;
  closeSideBar: () => void;
}

interface ButtonTitleValues {
  title: string;
  link: string;
  canUseWithLogin: boolean;
}

const ButtonTitle: { [key in string]: ButtonTitleValues } = {
  main: {
    title: "메인으로 가기",
    link: ROUTE.MAIN,
    canUseWithLogin: false,
  },
  findWithPicture: {
    title: "사진으로 찾기",
    link: ROUTE.SEARCH_IMAGE,
    canUseWithLogin: false,
  },
  findPharmacy: {
    title: "약국 찾기",
    link: ROUTE.SEARCH_PHARMACY,
    canUseWithLogin: false,
  },
  myPage: {
    title: "마이페이지",
    link: ROUTE.MY_PAGE,
    canUseWithLogin: true,
  },
  guide: {
    title: "설치 가이드",
    link: ROUTE.GUIDE,
    canUseWithLogin: false,
  },
};

function Sidebar({ openSideBar, closeSideBar }: SidebarProp) {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  const handleClickBtn = (url: string) => {
    closeSideBar();
    router.push(url);
  };

  const logout = async () => {
    try {
      await get(AUTH.LOGOUT);
      await router.push(ROUTE.LOGIN);
      setUser({
        id: "",
        email: "",
        name: "",
        profileImg: "",
        provider: "",
        phone: "",
      });
    } catch (err: any) {
      console.error(err);
    }
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
            {Object.entries(ButtonTitle).map(([key, value]) =>
              value.canUseWithLogin && !user.id ? (
                <Fragment key={key}></Fragment>
              ) : (
                <SidebarBtn
                  key={key}
                  $bgColor={MAIN_COLOR}
                  onClick={() => handleClickBtn(value.link)}>
                  {value.title}
                </SidebarBtn>
              ),
            )}
          </BtnContainer>
          {user.id ? (
            <LoginBtn $bgColor={MAIN_COLOR} onClick={logout}>
              로그아웃
            </LoginBtn>
          ) : (
            <LoginBtn
              $bgColor={MAIN_COLOR}
              onClick={() => router.push(ROUTE.LOGIN)}>
              로그인
            </LoginBtn>
          )}
        </SidebarBody>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
