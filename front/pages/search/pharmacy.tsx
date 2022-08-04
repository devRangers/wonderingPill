import type { NextPage } from "next";
import { useState } from "react";
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
  const [option, setOption] = useState("name");
  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useState("");

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputText);
  };

  return (
    <PageContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <SearchPharmContainer $bgColor={BOX_COLOR}>
        <SearchContainer onSubmit={onSubmitHandler}>
          <SearchSelect $bgColor={MAIN_COLOR} onChange={selectChangeHandler}>
            <SearchOption value="name">이름</SearchOption>
            <SearchOption value="address">지역</SearchOption>
          </SearchSelect>
          <SearchInput
            type="text"
            value={inputText}
            onChange={inputChangeHandler}
          />
          <SearchBtn type="submit" $bgColor={MAIN_COLOR}>
            검색
          </SearchBtn>
        </SearchContainer>

        <KakaoMap keyword={keyword} option={option} />
      </SearchPharmContainer>
    </PageContainer>
  );
};

export default SearchPharmPage;
