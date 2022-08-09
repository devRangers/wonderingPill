import { styled } from "styletron-react";

export const LoginFormContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "3fr 1fr",
});

export const Form = styled("form", {
  display: "grid",
  gridTemplateRows: "4fr 1fr",
  alignItems: "center",
});

export const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const SubBtnContainer = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "80%",
  margin: "0 auto",
  color: "#fff",
});

export const CheckboxContainer = styled("div", {
  color: "#fff",
  fontSize: "0.9rem",
});

export const TextBtn = styled("button", {
  border: 0,
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "0.9rem",
});

export const SnsLoginContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1.5fr",
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
    height: "1px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 1.5rem",
  },
  ":after": {
    content: "''",
    flexGrow: 1,
    backgroundColor: "#fff",
    height: "1px",
    fontSize: "0px",
    lineHeight: "0px",
    margin: "0 1.5rem",
  },
});

export const SnsBtnContainer = styled("div", {
  width: "30%",
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
