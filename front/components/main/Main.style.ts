import { styled } from "styletron-react";

export const MainContainer = styled(
  "div",
  (props: {
    $bgColor: string;
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    backgroundColor: props.$bgColor,
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const MainContent = styled("div", {
  height: "100%",
  maxWidth: "34rem",
  display: "grid",
  margin: "0 auto",
  gridTemplateRows: "1fr 1.3fr 0.2fr",
});

export const ImageSection = styled("section", {
  position: "relative",
  margin: "0 auto",
  width: "60%",
});
export const MainSection = styled("section", {
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
  gridTemplateColumns: "repeat(2, 1fr)",
  backgroundColor: "#fff",
  margin: "0 2rem",
  padding: "1.5rem",
  borderRadius: "2rem",
});

export const MainItem = styled("article", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

export const ImageWrapper = styled("div", {
  position: "relative",
  width: "60%",
  height: "60%",
});
