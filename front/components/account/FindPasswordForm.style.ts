import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

export const Input = styled("input", {
  width: "80%",
  maxWidth: "25rem",
  minHeight: "3.5rem",

  backgroundColor: "#fff",
  border: "none",
  borderRadius: "25px",

  outline: "0",
  fontSize: "1.2rem",
  padding: "0 1rem",

  "::-webkit-input-placeholder": {
    textAlign: "center",
    color: "#A4A4A4",
  },
});

export const ErrorMessage = styled("div", {
  textAlign: "start",
  width: "80%",
  maxWidth: "25rem",
  height: "1rem",

  padding: "0 1rem",
  margin: "0.3rem 0 0.3rem 0.2rem",

  fontSize: "0.9rem",
  color: "#bd0000",
});

export const FindBtn = styled("button", (props: { $bgColor: string }) => ({
  width: "80%",
  maxWidth: "25rem",
  minHeight: "3.5rem",

  backgroundColor: props.$bgColor,
  border: "none",
  borderRadius: "25px",

  outline: "0",
  fontSize: "1.2rem",
  padding: "0 1rem",

  fontWeight: "bold",
  color: "#fff",
}));
