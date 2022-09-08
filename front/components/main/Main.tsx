import Image from "next/image";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import {
  ImageSection,
  ImageWrapper,
  MainContainer,
  MainContent,
  MainItem,
  MainSection,
} from "./Main.style";
import { useRouter } from "next/router";

interface MainSectionValues {
  src: string;
}
const MainSectionTitle: { [key in string]: MainSectionValues } = {
  "사진으로 찾기": {
    src: "/images/main/findwithImage.png",
  },
  "약국 찾기": {
    src: "/images/main/findPharmarcy.png",
  },
  "약 검색하기": {
    src: "/images/main/searchPill.png",
  },
  "마이 페이지": {
    src: "/images/main/mypage.png",
  },
};

function Main() {
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
              <ImageWrapper>
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
