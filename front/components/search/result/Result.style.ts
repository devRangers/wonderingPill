import { styled } from "styletron-react";

export const FilteringSearchContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    display: "grid",
    gridTemplateRows: "0.2fr 0.2fr 0.2r 0.1fr 0.1fr 0.1fr 0.1fr 0.13fr",
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const TitleContainer = styled("div", {
  border: "1px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TitleBox = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  maxWidth: "26rem",
  height: "80%",
  borderRadius: "1.5rem",
  backgroundColor: props.$bgColor,
}));

export const Title = styled("div", {
  textAlign: "center",
  width: "60%",
  lineHeight: "1.2rem",
  color: "#fff",
  fontWeight: "bold",
});

export const EffectContainer = styled("div", {
  border: "1px solid",
});

export const EffectBox = styled("div", {
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
