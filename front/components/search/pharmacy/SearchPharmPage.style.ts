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
    gridTemplateRows: "1.2fr 1fr",
  }),
);

export const SearchPharmContainer = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "grid",
    gridTemplateRows: "1fr 1fr 5fr",
    backgroundColor: props.$bgColor,
    borderRadius: "0 0 15px 15px",
  }),
);

export const SearchPharmTitle = styled(
  "h1",
  (props: { $txtColor: string }) => ({
    color: props.$txtColor,
    fontWeight: "bold",
    alignSelf: "center",
    justifySelf: "center",
  }),
);

export const SearchContainer = styled("div", {
  width: "90%",
  height: "80%",
  alignSelf: "center",
  display: "grid",
  gridTemplateColumns: "1fr 4fr 1fr",
  justifySelf: "center",
});

export const SearchSelect = styled("select", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "15px",
  padding: "0 0.3rem",
}));

export const SearchOption = styled("option", {
  backgroundColor: "#fff",
  color: "#000",
  textAlign: "center",
});

export const SearchInput = styled("input", {
  width: "90%",
  justifySelf: "center",
  paddingLeft: "1rem",
  borderRadius: "15px",
});

export const SearchBtn = styled("button", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "15px",
  padding: "0 0.3rem",
}));
