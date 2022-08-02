import { Title } from "@searchComp/FindWithImage.style";
import { FOOTER_HEIGHT, FULL_HEIGHT, HEADER_HEIGHT } from "@utils/constant";
import React from "react";
import {
  Bottom,
  Caution,
  Company,
  Effect,
  FilteringSearchContainer,
  Keep,
  SideEffect,
  Usage,
} from "./Result.style";

function FilteringSearch() {
  return (
    <FilteringSearchContainer
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $fullHeight={FULL_HEIGHT}>
      <Title>a</Title>
      <Effect>b</Effect>
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
