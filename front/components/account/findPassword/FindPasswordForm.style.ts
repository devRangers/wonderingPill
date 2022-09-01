import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

export const ErrorMessage = styled("div", (props: { $txtColor: string }) => ({
  textAlign: "start",
  width: "80%",
  maxWidth: "25rem",
  height: "1rem",

  padding: "0 1rem",
  margin: "0.3rem 0 0.3rem 0.2rem",

  fontSize: "0.9rem",
  color: props.$txtColor,
}));

export const ModalInner = styled("div", {
  height: "8rem",
  padding: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.3rem",
  fontWeight: "bold",
});
