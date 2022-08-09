import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { PharmacyResponse as PharmacyType } from "@modelTypes/pharmacyResponse";
import { isWideDevice } from "@utils/isWideDevice";
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
  PharmListBox,
  PharmListBoxHeader,
  Dot,
  PharmListBoxBody,
} from "@searchPharmComp/SearchPharmPage.style";
import KakaoMap from "@searchPharmComp/KakaoMap";
import PharmList from "@searchPharmComp/PharmList";

interface PharmacyResponse {
  statusCode: number;
  message: string;
  pharmacy: PharmacyType[];
}

const searchPharm = async (keyword: string, option: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pharmacy/search?${option}=${keyword}`,
  );
  const result: PharmacyResponse = await res.json();
  return result;
};

const SearchPharmPage: NextPage = () => {
  const isWide = isWideDevice();

  const [option, setOption] = useState("address");
  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);
  const [pharmList, setPharmList] = useState<PharmacyType[]>([]);

  useQuery("searchPharm", () => searchPharm(keyword, option), {
    enabled: !!keyword && isSubmitBtnClicked,
    onSuccess: (data) => {
      setIsSubmitBtnClicked(false);
      setPharmList(data.pharmacy);
    },
  });

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitBtnClicked(true);
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
            <SearchOption value="address">지역</SearchOption>
            <SearchOption value="name">이름</SearchOption>
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

        <KakaoMap pharmList={pharmList} />
      </SearchPharmContainer>
      <PharmListBox $bgColor={MAIN_COLOR}>
        <PharmListBoxHeader $isWide={isWide}>
          <Dot $bgColor="#FB4646" />
          <Dot $bgColor="#FEB024" />
          <Dot $bgColor="#28C131" />
        </PharmListBoxHeader>
        <PharmListBoxBody>
          {pharmList.length > 0 && <PharmList pharmList={pharmList} />}
        </PharmListBoxBody>
      </PharmListBox>
    </PageContainer>
  );
};

export default SearchPharmPage;
