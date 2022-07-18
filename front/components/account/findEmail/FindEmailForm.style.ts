import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  height: "55%",
});

export const ContentContainer = styled("div", {
  height: "45%",
});

export const InputContainer = styled("div", {
  width: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Input = styled("input", {
  width: "65%",
  height: "60%",
  border: 0,
  borderRadius: "25px",
  fontSize: "1rem",
  padding: "0 1rem",
  "::-webkit-input-placeholder": {
    textAlign: "center",
    fontFamily: "'Noto Sans KR', sans-serif",
    color: "#A4A4A4",
  },
});

export const ErrorMessage = styled("div", (props: { $txtColor: string }) => ({
  textAlign: "start",
  width: "65%",
  marginTop: "0.2rem",
  padding: "0 1rem",
  color: props.$txtColor,
  fontSize: "0.9rem",
}));

export const SubmitBtn = styled(
  "button",
  (props: { $btnColor: string }) => ({
    
  }),
);
