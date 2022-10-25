import { styled } from "styletron-react";

export const PageContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    position: "relative",
    width: "100vw",
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
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

export const SearchContainer = styled("form", {
  width: "95%",
  height: "70%",
  display: "grid",
  gridTemplateColumns: "1fr 4fr 1fr",
  justifySelf: "center",
  alignSelf: "end",
  margin: "0.3rem 0",
});

export const SearchSelect = styled("select", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "15px",
  padding: "0 0.3rem",
  textAlign: "center",
  height: "2.3rem",
}));

export const SearchOption = styled("option", {
  backgroundColor: "#fff",
  color: "#000",
});

export const SearchInput = styled("input", {
  width: "90%",
  height: "2.3rem",
  justifySelf: "center",
  paddingLeft: "1rem",
  borderRadius: "15px",
});

export const SearchBtn = styled("button", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "15px",
  padding: "0 0.3rem",
  height: "2.3rem",
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

export const PharmInfoContainer = styled(
  "div",
  (props: { $isLong: boolean }) => ({
    width: "90%",
    height: props.$isLong ? "80%" : "90%",
  }),
);

export const PharmInfo = styled(
  "div",
  (props: { $borderColor: string; $isLong: boolean }) => ({
    border: `2px solid ${props.$borderColor}`,
    width: "90%",
    minHeight: "4rem",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1.7fr 1fr",
    alignItems: "center",
    margin: props.$isLong ? "0 auto 20px auto" : "0 auto 10px auto",
  }),
);

export const PharmName = styled("h1", {
  fontWeight: "bold",
  padding: "0 10px",
});

export const PharmSubInfo = styled("p", {
  fontSize: "0.8rem",
  color: "#717171",
  padding: "0 5px",
  justifySelf: "end",
  gridColumnStart: 2,
  gridRowStart: 2,
});

export const IconBtn = styled("button", {
  fontSize: "1.2rem",
  gridColumnStart: 2,
  gridRowStart: 1,
  justifySelf: "end",
});
