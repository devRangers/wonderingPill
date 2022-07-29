import { styled } from "styletron-react";

export const FormContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr 1fr 0.7fr",
  height: "35vh",
});

export const TitleContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Title = styled("h1", (props: { $txtColor: string }) => ({
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: props.$txtColor,
}));

export const InputContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Input = styled("input", {
  width: "50%",
  height: "2.5rem",
  borderRadius: "25px",
  border: "0.1px solid #a4a4a4",
  textAlign: "center",
  fontSize: "1.2rem",
  marginRight: "0.5rem",
});

export const SubmitBtn = styled("button", (props: { $btnColor: string }) => ({
  borderRadius: "25px",
  backgroundColor: props.$btnColor,
  color: "#fff",
  padding: "0.5rem 1rem",
}));

export const RetryBtnContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "0.5fr 1fr",
  justifyItems: "center",
  alignItems: "center",
});

export const RetryMessage = styled("p", {
  fontSize: "0.9rem",
});

export const RetryBtn = styled("button", (props: { $btnColor: string }) => ({
  backgroundColor: props.$btnColor,
  color: "#fff",
  padding: "0.1rem 1rem",
}));

export const CloseBtnContainer = styled("div", {
  display: "grid",
  justifyItems: "flex-end",
  alignItems: "center",
});

export const CloseBtn = styled("button", {
  color: "#a4a4a4",
  marginRight: "0.5rem",
});
