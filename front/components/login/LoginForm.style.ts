import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  height: "40%",
});

export const SnsLoginContainer = styled("div", {
  height: "15%",
});

export const SnsTitle = styled("div", {
  display: "flex",
  flexBasis: "100%",
  alignItems: "center",
  fontSize: "1rem",
  color: "#fff",
  ":before": {
    content: "''",
    flexGrow: 1,
    backgroundColor: "#fff",
    height: "1.5px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 1.5rem",
  },
  ":after": {
    content: "''",
    flexGrow: 1,
    backgroundColor: "#fff",
    height: "1.5px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 1.5rem",
  },
});

export const SnsBtnContainer = styled("div", {
  width: "30%",
  height: "85%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 auto",
});

export const KakaoBtn = styled("div", {
  width: "45px",
  height: "45px",
  border: 0,
  backgroundColor: "#FEE500",
  borderRadius: "5px",
});

export const GoogleBtn = styled("button", {
  width: "45px",
  height: "45px",
  backgroundColor: "#fff",
  border: 0,
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
