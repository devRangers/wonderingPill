import type { NextPage } from "next";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
  BOX_COLOR,
  BOX_TITLE_COLOR,
} from "@utils/constant";
import {
  PageContainer,
  SearchPharmContainer,
  SearchPharmTitle,
  SearchContainer,
  SearchSelect,
  SearchOption,
  SearchInput,
  SearchBtn,
} from "@searchPharmComp/SearchPharmPage.style";

const SearchPharmPage: NextPage = () => {
  return (
    <PageContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <SearchPharmContainer $bgColor={BOX_COLOR}>
        <SearchPharmTitle $txtColor={BOX_TITLE_COLOR}>
          약국 찾기
        </SearchPharmTitle>
        <SearchContainer>
          <SearchSelect $bgColor={MAIN_COLOR}>
            <SearchOption value="지역">지역</SearchOption>
            <SearchOption value="이름">이름</SearchOption>
          </SearchSelect>
          <SearchInput type="text" />
          <SearchBtn $bgColor={MAIN_COLOR}>검색</SearchBtn>
        </SearchContainer>
      </SearchPharmContainer>
    </PageContainer>
  );
};

export default SearchPharmPage;
