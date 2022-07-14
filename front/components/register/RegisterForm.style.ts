import { styled } from "styletron-react";

export const Container = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: props.$bgColor,
}));

export const LogoContainer = styled("div", {
  position: "relative",
  height: "100px",
});

export const Form = styled("form", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem",
});

export const Input = styled("input", {
  width: "65%",
  height: "5rem",
  backgroundColor: "#fff",
  border: "none",
  borderRadius: "25px",
  outline: "0",
  fontSize: "1.5rem",
  padding: "0 1rem",

  "::-webkit-input-placeholder": {
    textAlign: "center",
    color: "#A4A4A4",
  },
});

export const ErrorMessage = styled("div", {
  textAlign: "start",
  width: "65%",
  height: "1rem",
  padding: "0 1rem",
  margin: "0.5rem 0 0.5rem 0.2rem",
  fontWeight: "bold",
  color: "#bd0000",
});

export const SelfAuthenticationLine = styled(
  "div",
  (props: { $lineColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: props.$lineColor,
    fontWeight: "bold",
    fontSize: "1.2rem",
    width: "80%",

    ":before": {
      content: "''",
      flex: "0.5",
      backgroundColor: props.$lineColor,
      height: "1.5px",
      margin: "0 1.5rem",
    },
    ":after": {
      content: "''",
      backgroundColor: props.$lineColor,
      height: "1.5px",
      flex: "0.5",
      margin: "0 1.5rem",
    },
  }),
);
