import { styled } from "styletron-react";

export const FilteringSearchContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    display: "grid",
    gridTemplateRows: "1.3fr 1.3fr 1.3fr 0.7fr 1fr 1fr 1fr 1fr",
    gap: "0.5rem",
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const TitleContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "7rem",
});

export const TitleBox = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  maxWidth: "26rem",
  height: "60%",
  borderRadius: "1.5rem",
  backgroundColor: props.$bgColor,
  position: "relative",
}));

export const WarningContainer = styled("div", {
  position: "absolute",
  right: "0",
  bottom: "-1.3rem",
  widht: "5rem",
  height: "1rem",
  fontSize: "0.6rem",
  fontWeight: "bold",
});

export const WarningItem = styled("span", {
  marginLeft: "1rem",
  ":before": {
    content: "''",
    display: "inline-block",
    position: "relative",
    width: "5px",
    height: "5px",
    left: "-5px",
    borderRadius: "50%",
    backgroundColor: "red",
  },
});

export const Title = styled("div", {
  textAlign: "center",
  width: "65%",
  lineHeight: "1.2rem",
  color: "#fff",
  fontSize: "1.1rem",
  fontWeight: "bold",
});

export const EffectContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const EffectBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});

export const EffectTitle = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "7rem",
  fontWeight: "bold",
  backgroundColor: props.$bgColor,
  borderRadius: "1.5rem",
}));

export const EffectDescriptionContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "110%",
    maxHeight: "7rem",
    left: "-10%",
    padding: "0.7rem 1rem 0.5rem 2rem",
    border: `2px solid ${props.$borderColor}`,
  }),
);

export const EffectDescription = styled(
  "div",
  (props: { $scrollColor: string }) => ({
    height: "90%",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "0.9rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: props.$scrollColor,
      borderRadius: "20px",
    },
  }),
);

export const CompanyContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CompanyBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});

export const CompanyTitle = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "4rem",
  fontWeight: "bold",
  backgroundColor: props.$bgColor,
  borderRadius: "1.5rem",
}));

export const CompanyDescriptionContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "110%",
    maxHeight: "7rem",
    left: "-10%",
    padding: "0.7rem 1rem 0.5rem 2rem",
    border: `2px solid ${props.$borderColor}`,
  }),
);

export const SmallContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SmallBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});
