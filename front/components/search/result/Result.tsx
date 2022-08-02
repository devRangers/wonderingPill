import {
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  HEADER_HEIGHT,
  MAIN_COLOR,
} from "@utils/constant";
import React from "react";
import {
  Bottom,
  Caution,
  Company,
  EffectContainer,
  FilteringSearchContainer,
  Keep,
  SideEffect,
  Usage,
  TitleBox,
  TitleContainer,
  Title,
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
          <Title>{tempData.title}</Title>
        </TitleBox>
      </TitleContainer>
      <EffectContainer></EffectContainer>
      <SideEffect>c</SideEffect>
      <Company>d</Company>
      <Usage>e</Usage>
      <Caution>f</Caution>
      <Keep>g</Keep>
      <Bottom>h</Bottom>
    </FilteringSearchContainer>
  );
}

export default FilteringSearch;
