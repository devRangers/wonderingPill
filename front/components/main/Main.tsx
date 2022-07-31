import Image from "next/image";
import { FOOTER_HEIGHT, HEADER_HEIGHT, MAIN_COLOR } from "@utils/constant";
import {
  ImageSection,
  MainContainer,
  MainContent,
  MainItem,
  MainSection,
} from "./Main.style";

interface MainSectionValues {
  src: string;
}
const MainSectionTitle: { [key in string]: MainSectionValues } = {
  "사진으로 찾기": {
    src: "",
  },
  "약국 찾기": {
    src: "",
  },
  "시제품 약 검색": {
    src: "",
  },
  "증상으로 검색": {
    src: "",
  },
  "내 건강 캘린더": {
    src: "",
  },
  "마이 페이지": {
    src: "",
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
                alt={key}
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: "50%",
                }}
              />
              <h4>{key}</h4>
            </MainItem>
          ))}
        </MainSection>
      </MainContent>
    </MainContainer>
  );
}

export default Main;
