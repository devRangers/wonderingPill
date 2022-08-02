import { styled } from "styletron-react";

export const FilteringSearchContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    display: "grid",
    gridTemplateRows: "0.15fr 0.15fr 0.15fr 0.11fr 0.11fr 0.11fr 0.11fr 0.11fr",
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const Title = styled("div", {
  border: "1px solid",
});
export const Effect = styled("div", {
  border: "1px solid",
});
export const SideEffect = styled("div", {
  border: "1px solid",
});
export const Company = styled("div", {
  border: "1px solid",
});
export const Usage = styled("div", {
  border: "1px solid",
});

export const Caution = styled("div", {
  border: "1px solid",
});

export const Keep = styled("div", {
  border: "1px solid red",
});

export const Bottom = styled("div", {
  border: "1px solid red",
});
