import { styled } from "styletron-react";

export const PageContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    width: "100vw",
    display: "grid",
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
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

export const SearchContainer = styled("form", {
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

export const PharmListBox = styled("div", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  width: "90%",
  height: "90%",
  borderRadius: "15px",
  justifySelf: "center",
  alignSelf: "center",
  display: "grid",
  gridTemplateRows: "1fr 5fr",
  justifyItems: "center",
}));

export const PharmListBoxHeader = styled(
  "div",
  (props: { $isWide: boolean }) => ({
    width: "95%",
    display: "grid",
    gridTemplateColumns: props.$isWide ? "1fr 1fr 1fr 15fr" : "1fr 1fr 1fr 9fr",
  }),
);

export const Dot = styled("div", (props: { $bgColor: string }) => ({
  width: "0.9rem",
  height: "0.9rem",
  borderRadius: "50%",
  backgroundColor: props.$bgColor,
  justifySelf: "center",
  alignSelf: "center",
}));

export const PharmListBoxBody = styled("div", {
  borderRadius: "15px",
  backgroundColor: "#fff",
  width: "85vw",
  height: "95%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const PharmInfoContainer = styled("div", {
  width: "90%",
  height: "90%",
});

export const PharmInfo = styled("div", (props: { $borderColor: string }) => ({
  border: `2px solid ${props.$borderColor}`,
  display: "grid !important",
  gridTemplateRows: "2fr 1fr",
  gridTemplateColumns: "2fr 1fr",
}));

export const PharmName = styled("h1", {
  fontWeight: "bold",
  fontSize: "1rem",
});

export const PharmSubInfo = styled("p", {
  fontSize: "0.9rem",
  color: "#717171",
  textAlign: "center",
  justifySelf: "end",
});

export const IconBtn = styled("button", {
  gridColumnStart: 2,
  gridRowStart: 2,
});
