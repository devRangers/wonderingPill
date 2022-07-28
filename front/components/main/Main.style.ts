import { styled } from "styletron-react";

export const MainContainer = styled(
  "div",
  (props: {
    $bgColor: string;
    $headerHeight: string;
    $footerHeight: string;
  }) => ({
    backgroundColor: props.$bgColor,
    height: `calc(100vh - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const MainContent = styled("div", {
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr 4fr",
});

export const ImageSection = styled("section", {
  position: "relative",
  margin: "0 auto",
  width: "60%",
});
export const MainSection = styled("section", {
  display: "grid",
  gridTemplateRows: "repeat(3, 1fr)",
  gridTemplateColumns: "repeat(2, 1fr)",
  backgroundColor: "#fff",
  margin: "0 2rem",
  borderRadius: "2rem",
});

export const MainItem = styled("article", {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  position: "relative",
});
