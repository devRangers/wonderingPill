import { styled } from "styletron-react";

export const PageContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    width: "100vw",
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  }),
);

export const SearchPharmContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr 5fr",
  alignItems: "center",
  justifyItems: "center",
  backgroundColor: "#2A306A",
});

export const SearchPharmTitle = styled("h1", {
  color: "#fff",
  fontWeight: "bold",
});
