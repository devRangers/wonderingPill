import type { NextPage } from "next";
import { useState } from "react";
import * as Api from "@api";
import { useQuery } from "react-query";
import { pharmKeys } from "@utils/queryKey";
import { PharmacyResponse as PharmacyType } from "@modelTypes/pharmacyResponse";
import { isWideDevice } from "@utils/isWideDevice";
import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
  BOX_COLOR,
  GREEN_COLOR,
  YELLOW_COLOR,
  RED_COLOR,
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
import { PHARMACY } from "@utils/endpoint";

interface PharmacyResponse {
  statusCode: number;
  message: string;
  pharmacy: PharmacyType[];
}

const SearchPharmPage: NextPage = () => {
  const isWide = isWideDevice();

  const [option, setOption] = useState("address");
  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);
  const [pharmList, setPharmList] = useState<PharmacyType[]>([]);

  useQuery(
    pharmKeys.searchPharm,
    () => Api.get<PharmacyResponse>(`${PHARMACY.SEARCH}?${option}=${keyword}`),
    {
      enabled: !!keyword && isSubmitBtnClicked,
      onSuccess: (data) => {
        setIsSubmitBtnClicked(false);
        setPharmList(data.pharmacy);
      },
    },
  );

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
          <Dot $bgColor={RED_COLOR} />
          <Dot $bgColor={YELLOW_COLOR} />
          <Dot $bgColor={GREEN_COLOR} />
        </PharmListBoxHeader>
        <PharmListBoxBody>
          {pharmList.length > 0 && <PharmList pharmList={pharmList} />}
        </PharmListBoxBody>
      </PharmListBox>
    </PageContainer>
  );
};

export default SearchPharmPage;
