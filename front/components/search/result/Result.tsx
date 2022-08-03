import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import React from "react";
import {
  SmallContainer as Bottom,
  SmallContainer as Caution,
  CompanyContainer as Company,
  EffectContainer as Effect,
  EffectContainer as SideEffect,
  FilteringSearchContainer,
  SmallContainer as Keep,
  SmallContainer as Usage,
  TitleBox,
  TitleContainer,
  Title,
  EffectBox,
  EffectTitle,
  EffectDescription,
  WarningContainer,
  WarningItem,
  EffectDescriptionContainer,
  CompanyBox,
  CompanyTitle,
  CompanyDescriptionContainer,
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
      <Effect>
        <EffectBox>
          <EffectTitle $bgColor={MAIN_COLOR}>효능</EffectTitle>
          <EffectDescriptionContainer $borderColor={MAIN_COLOR}>
            <EffectDescription $scrollColor={MAIN_COLOR}>
              {tempData.effect}
            </EffectDescription>
          </EffectDescriptionContainer>
        </EffectBox>
      </Effect>
      <SideEffect>
        <EffectBox>
          <EffectTitle $bgColor={MAIN_COLOR}>부작용</EffectTitle>
          <EffectDescriptionContainer $borderColor={MAIN_COLOR}>
            <EffectDescription $scrollColor={MAIN_COLOR}>
              {tempData.effect}
            </EffectDescription>
          </EffectDescriptionContainer>
        </EffectBox>
      </SideEffect>
      <Company>
        <CompanyBox>
          <CompanyTitle $bgColor={MAIN_COLOR}>업체명</CompanyTitle>
          <CompanyDescriptionContainer $borderColor={MAIN_COLOR}>
            {tempData.company}
          </CompanyDescriptionContainer>
        </CompanyBox>
      </Company>
      <Usage>e</Usage>
      <Caution>f</Caution>
      <Keep>g</Keep>
      <Bottom>h</Bottom>
    </FilteringSearchContainer>
  );
}

export default FilteringSearch;
