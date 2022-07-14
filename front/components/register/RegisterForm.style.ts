import { styled } from "styletron-react";

export const Container = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: props.$bgColor,
}));

export const LogoContainer = styled("div", {
  position: "relative",
  margin: "0 auto",
  minHeight: "4rem",
  width: "40%",
  minWidth: "5rem",
});

export const Form = styled("form", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
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
  fontSize: "1.5rem",
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

export const SelfAuthenticationLine = styled(
  "div",
  (props: { $lineColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: props.$lineColor,
    fontWeight: "bold",
    width: "90%",

    ":before": {
      content: "''",
      flex: "0.5",
      backgroundColor: props.$lineColor,
      height: "1.5px",
      margin: "0 1rem",
    },
    ":after": {
      content: "''",
      backgroundColor: props.$lineColor,
      height: "1.5px",
      flex: "0.5",
      margin: "0 1rem",
    },
  }),
);

export const AuthenticationForm = styled(Form, {
  padding: "0",
});

export const PhoneNumberContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const AuthenticationInput = styled(Input, {
  width: "70%",
  marginRight: "0.7rem",
});

export const SubmitPhoneNumber = styled("button", {
  width: "50px",
  height: "40px",
  border: "none",
  borderRadius: "18px",
});
