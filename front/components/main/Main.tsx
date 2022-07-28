import { MAIN_COLOR } from "@utils/constant";
import Image from "next/image";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@utils/constant";
import {
  ImageSection,
  MainContainer,
  MainContent,
  MainItem,
  MainSection,
} from "./Main.style";

interface MainSectionValues {
  title: string;
  src: string;
  alt: string;
}
const MainSectionTitle: { [key in string]: MainSectionValues } = {
  findWithPicture: {
    title: "사진으로 찾기",
    src: "",
    alt: "사진으로 찾기",
  },
  findPharmacy: {
    title: "약국 찾기",
    src: "",
    alt: "약국 찾기",
  },
  searchPill: {
    title: "시제품 약 검색",
    src: "",
    alt: "시제품 약 검색",
  },
  searchSymptom: {
    title: "증상으로 검색",
    src: "",
    alt: "증상으로 검색",
  },
  healthChallenge: {
    title: "내 건강 캘린더",
    src: "",
    alt: "내 건강 캘린더",
  },
  myPage: {
    title: "마이페이지",
    src: "",
    alt: "마이페이지",
  },
};

function Main() {
  return (
    <MainContainer
      $bgColor={MAIN_COLOR}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}>
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
          {Object.entries(MainSectionTitle).map(([key, value], index) => (
            <MainItem key={key}>
              <Image
                src="/images/register_logo.png"
                alt={value.alt}
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: "50%",
                }}
              />
            </MainItem>
          ))}
        </MainSection>
      </MainContent>
    </MainContainer>
  );
}

export default Main;
