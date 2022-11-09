import Link from "next/link";
import { ACCENT_COLOR, SEMI_ACCENT_COLOR, ROUTE } from "@utils/constant";
import { PageContainer, Title, NavButton } from "./GuidePageComp.style";

const navBtn = {
  android: "안드로이드 설치하러 가기",
  ios: "ios 설치하러 가기",
  chrome: "chrome 설치하러 가기",
};

function GuidePageComp() {
  return (
    <PageContainer>
      <Title $txtColor={ACCENT_COLOR}>설치 가이드</Title>
      {Object.entries(navBtn).map(([key, value]) => (
        <Link href={ROUTE.GUIDE_NAV(key)} key={key}>
          <NavButton $btnColor={SEMI_ACCENT_COLOR}>{value}</NavButton>
        </Link>
      ))}
    </PageContainer>
  );
}

export default GuidePageComp;
