import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import React from "react";
import {
  Bottom,
  SmallContainer as Caution,
  CompanyContainer as Company,
  BigContainer as Effect,
  BigContainer as SideEffect,
  FilteringSearchContainer,
  SmallContainer as Keep,
  BigContainer as Usage,
  TitleBox,
  TitleContainer,
  Title,
  BigTitle,
  BigDescription,
  WarningContainer,
  WarningItem,
  BigDescriptionContainer,
  CompanyBox,
  CompanyTitle,
  CompanyDescriptionContainer,
  SmallBox,
  SmallTitle,
  SmallDescriptionContainer,
  SmallDescription,
  BigBox,
  BottomBox,
  RegisterButton,
  ModalContainer,
  CautionModalButton,
  SearchOtherPill,
} from "./Result.style";

const tempData: { [key in string]: string } = {
  title: "한미아스피린장용정 100밀리그램",
  effect:
    "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  sideEffect:
    "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  company: "한미약품(주)",
  usage:
    "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  caution:
    "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  keep: "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
  bottom:
    "한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램한미아스피린장용정 100밀리그램",
};

function FilteringSearch() {
  return (
    <FilteringSearchContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <TitleContainer>
        <TitleBox $bgColor={MAIN_COLOR}>
          {/* <WarningContainer>
            <WarningItem>덜위험</WarningItem>
            <WarningItem>위험</WarningItem>
          </WarningContainer> */}
          <Title>{tempData.title}</Title>
        </TitleBox>
      </TitleContainer>
      <Company>
        <CompanyBox>
          <CompanyTitle $bgColor={MAIN_COLOR}>업체명</CompanyTitle>
          <CompanyDescriptionContainer $borderColor={MAIN_COLOR}>
            {tempData.company}
          </CompanyDescriptionContainer>
        </CompanyBox>
      </Company>
      <Effect>
        <BigBox>
          <BigTitle $bgColor={MAIN_COLOR}>효능</BigTitle>
          <BigDescriptionContainer $borderColor={MAIN_COLOR}>
            <BigDescription $scrollColor={MAIN_COLOR}>
              {tempData.effect}
            </BigDescription>
          </BigDescriptionContainer>
        </BigBox>
      </Effect>
      <SideEffect>
        <BigBox>
          <BigTitle $bgColor={MAIN_COLOR}>부작용</BigTitle>
          <BigDescriptionContainer $borderColor={MAIN_COLOR}>
            <BigDescription $scrollColor={MAIN_COLOR}>
              {tempData.effect}
            </BigDescription>
          </BigDescriptionContainer>
        </BigBox>
      </SideEffect>
      <Usage>
        <BigBox>
          <BigTitle $bgColor={MAIN_COLOR}>용법/용량</BigTitle>
          <BigDescriptionContainer $borderColor={MAIN_COLOR}>
            <BigDescription $scrollColor={MAIN_COLOR}>
              {tempData.usage}
            </BigDescription>
          </BigDescriptionContainer>
        </BigBox>
      </Usage>
      <Caution>
        <SmallBox>
          <SmallTitle $bgColor={MAIN_COLOR}>주의사항</SmallTitle>
          <SmallDescriptionContainer $borderColor={MAIN_COLOR}>
            <SmallDescription $scrollColor={MAIN_COLOR}>
              {tempData.caution}
            </SmallDescription>
          </SmallDescriptionContainer>
        </SmallBox>
      </Caution>
      <Keep>
        <SmallBox>
          <SmallTitle $bgColor={MAIN_COLOR}>보관법</SmallTitle>
          <SmallDescriptionContainer $borderColor={MAIN_COLOR}>
            <SmallDescription $scrollColor={MAIN_COLOR}>
              {tempData.keep}
            </SmallDescription>
          </SmallDescriptionContainer>
        </SmallBox>
      </Keep>
      <Bottom>
        <BottomBox>
          <RegisterButton $bgColor={MAIN_COLOR}>
            내 약에 등록하기
          </RegisterButton>
          <ModalContainer>
            <CautionModalButton $color={MAIN_COLOR}>
              주의사항 더보기
            </CautionModalButton>
            <SearchOtherPill $color={MAIN_COLOR}>다른 약 검색</SearchOtherPill>
          </ModalContainer>
        </BottomBox>
      </Bottom>
    </FilteringSearchContainer>
  );
}

export default FilteringSearch;
