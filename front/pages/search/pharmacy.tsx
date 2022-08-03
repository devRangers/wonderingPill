import type { NextPage } from "next";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import {
  PageContainer,
  SearchPharmContainer,
  SearchPharmTitle,
} from "@searchPharmComp/SearchPharmPage.style";

const SearchPharmPage: NextPage = () => {
  return (
    <PageContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <SearchPharmContainer>
        <SearchPharmTitle>약국 찾기</SearchPharmTitle>
      </SearchPharmContainer>
    </PageContainer>
  );
};

export default SearchPharmPage;
