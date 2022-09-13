import Image from "next/image";
import { useRouter } from "next/router";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
  ROUTE,
  TOASTIFY,
} from "@utils/constant";
import { userAtom } from "@atom/userAtom";
import {
  ImageSection,
  ImageWrapper,
  MainContainer,
  MainContent,
  MainItem,
  MainSection,
} from "./Main.style";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

interface MainSectionValues {
  src: string;
  link: string;
}
const MainSectionTitle: { [key in string]: MainSectionValues } = {
  "사진으로 찾기": {
    src: "/images/main/findwithImage.png",
    link: ROUTE.SEARCH_IMAGE,
  },
  "약국 찾기": {
    src: "/images/main/findPharmacy.png",
    link: ROUTE.SEARCH_PHARMACY,
  },
  "약 검색하기": {
    src: "/images/main/searchPill.png",
    link: ROUTE.SEARCH_RESULT,
  },
  "마이 페이지": {
    src: "/images/main/mypage.png",
    link: ROUTE.MY_PAGE,
  },
};

function Main() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const notifyNeedLogin = () => toast.info(TOASTIFY.NEED_LOGIN);

  const handleClick = (value: MainSectionValues) => {
    !user.id && value.link === ROUTE.MY_PAGE
      ? notifyNeedLogin()
      : router.push(value.link);
  };

  return (
    <MainContainer
      $bgColor={MAIN_COLOR}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <MainContent>
        <ImageSection>
          <Image
            src="/images/register_logo.png"
            alt="wondering-pill-logo"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </ImageSection>
        <MainSection>
          {Object.entries(MainSectionTitle).map(([key, value]) => (
            <MainItem key={key}>
              <ImageWrapper onClick={() => handleClick(value)}>
                <Image
                  src={value.src}
                  alt={key}
                  layout="fill"
                  objectFit="contain"
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </ImageWrapper>
              <h4>{key}</h4>
            </MainItem>
          ))}
        </MainSection>
      </MainContent>
    </MainContainer>
  );
}

export default Main;
