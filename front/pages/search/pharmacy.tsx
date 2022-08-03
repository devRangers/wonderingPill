import type { NextPage } from "next";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
  BOX_COLOR,
} from "@utils/constant";
import {
  PageContainer,
  SearchPharmContainer,
  SearchContainer,
  SearchSelect,
  SearchOption,
  SearchInput,
  SearchBtn,
} from "@searchPharmComp/SearchPharmPage.style";
import KakaoMap from "@searchPharmComp/KakaoMap";

const SearchPharmPage: NextPage = () => {
  return (
    <PageContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <SearchPharmContainer $bgColor={BOX_COLOR}>
        <SearchContainer>
          <SearchSelect $bgColor={MAIN_COLOR}>
            <SearchOption value="지역">지역</SearchOption>
            <SearchOption value="이름">이름</SearchOption>
          </SearchSelect>
          <SearchInput type="text" />
          <SearchBtn $bgColor={MAIN_COLOR}>검색</SearchBtn>
        </SearchContainer>

        <KakaoMap />
      </SearchPharmContainer>
    </PageContainer>
  );
};

export default SearchPharmPage;
