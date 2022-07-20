import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "grid",
  gridTemplateRows: "2fr 1fr 1fr",
});

export const PhoneContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr",
});

export const PhoneTitle = styled("div", (props: { $txtColor: string }) => ({
  display: "flex",
  flexBasis: "100%",
  alignItems: "center",
  fontSize: "0.7rem",
  color: props.$txtColor,
  ":before": {
    content: "''",
    flexGrow: 1,
    backgroundColor: props.$txtColor,
    height: "1px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 1rem 0 3rem",
  },
  ":after": {
    content: "''",
    flexGrow: 1,
    backgroundColor: props.$txtColor,
    height: "1px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 3rem 0 1rem",
  },
}));

export const PhoneNumberContainer = styled("div", {
  width: "80%",
  display: "grid",
  gridTemplateColumns: "1fr 0.3fr 1fr 0.3fr 1fr",
  margin: "0 auto",
  justifyItems: "center",
  alignItems: "center",
});

export const PhoneNumberSelect = styled("select", {
  width: "100%",
  height: "3rem",
  border: 0,
  borderRadius: "25px",
  fontSize: "1rem",
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#fff",
});

export const PhoneNumberInput = styled("input", {
  width: "100%",
  height: "3rem",
  border: 0,
  borderRadius: "25px",
  fontSize: "1rem",
  textAlign: "center",
});

export const Hyphen = styled("p", (props: { $txtColor: string }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: props.$txtColor,
}));

export const BtnContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
