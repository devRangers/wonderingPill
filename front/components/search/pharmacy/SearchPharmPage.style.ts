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
    gridTemplateRows: "1fr 5fr",
    backgroundColor: props.$bgColor,
    borderRadius: "0 0 15px 15px",
    alignItems: "center",
  }),
);

export const SearchContainer = styled("div", {
  width: "95%",
  height: "70%",
  display: "grid",
  gridTemplateColumns: "1fr 4fr 1fr",
  justifySelf: "center",
  alignSelf: "end",
});

export const SearchSelect = styled("select", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "15px",
  padding: "0 0.3rem",
  textAlign: "center",
}));

export const SearchOption = styled("option", {
  backgroundColor: "#fff",
  color: "#000",
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

export const Map = styled("div", {
  width: "95%",
  height: "90%",
  justifySelf: "center",
  borderRadius: "15px",
});
