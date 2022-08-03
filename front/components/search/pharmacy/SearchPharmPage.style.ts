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

export const SearchPharmContainer = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "grid",
    gridTemplateRows: "1fr 1fr 5fr",
    alignItems: "center",
    justifyItems: "center",
    backgroundColor: props.$bgColor,
    borderRadius: "0 0 15px 15px",
  }),
);

export const SearchPharmTitle = styled(
  "h1",
  (props: { $txtColor: string }) => ({
    color: props.$txtColor,
    fontWeight: "bold",
  }),
);
