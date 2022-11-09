import Link from "next/link";
import { ACCENT_COLOR, SEMI_ACCENT_COLOR, ROUTE } from "@utils/constant";
import { INSTALL_CATEGORIES } from "@installContainer/constant";
import { PageContainer, Title, NavButton } from "./GuidePageComp.style";

function GuidePageComp() {
  return (
    <PageContainer>
      <Title $txtColor={ACCENT_COLOR}>설치 가이드</Title>
      {Object.entries(INSTALL_CATEGORIES).map(([key, value]) => (
        <Link href={ROUTE.GUIDE_NAV(key)} key={key}>
          <NavButton $btnColor={SEMI_ACCENT_COLOR}>{value}</NavButton>
        </Link>
      ))}
    </PageContainer>
  );
}

export default GuidePageComp;
