import { styled } from "styletron-react";

export const Container = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: props.$bgColor,
  position: "relative",
}));

export const UserDataContainer = styled("section", {
  flex: "0.5",
});

export const AuthenticationContainer = styled("section", {
  flex: "0.4",
});

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

export const SubmitButton = styled(
  "button",
  (props: { $btnColor: string }) => ({
    position: "absolute",

    width: "80%",
    maxWidth: "25rem",
    height: "3.5rem",

    bottom: "0",
    marginBottom: "1rem",
    borderRadius: "25px",

    backgroundColor: props.$btnColor,

    color: "#fff",
    fontSize: "1.3rem",
    fontWeight: "bold",
  }),
);

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

export const SelfAuthenticationLine = styled(
  "div",
  (props: { $lineColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: props.$lineColor,
    fontWeight: "bold",
    width: "90%",
    maxWidth: "30rem",

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

export const SubmitAuthenticationBtn = styled(
  "button",
  (props: { $btnColor: string }) => ({
    width: "50px",
    height: "40px",
    border: "none",
    borderRadius: "18px",

    backgroundColor: props.$btnColor,
    color: "#fff",
  }),
);

export const CheckboxContainer = styled("div", {
  width: "85%",
  maxHeight: "8rem",
  maxWidth: "30rem",
  margin: "auto",
  display: "flex",
  justifyContent: "space-around",
});
export const LabelContainer = styled("div", {});

export const LabelWrapper = styled("div", {
  fontSize: "0.8rem",
  flexWrap: "wrap",
});

export const CheckBox = styled("input", {
  display: "none",
});

export const Label = styled("label", {
  display: "flex",
  alignItems: "center",
  padding: "0 0.2rem 0.5rem 0.2rem",
  userSelect: "none",
});

export const CustomCheckmark = styled(
  "div",
  (props: { $checked: boolean; $markColor: string }) => ({
    display: "inline-block",
    height: "15px",
    width: "15px",
    backgroundColor: props.$checked ? props.$markColor : "#eee",
    borderRadius: "100%",
    marginRight: "0.3rem",
    ":after": {
      content: "''",
      position: "absolute",
      width: "3px",
      height: "7px",
      border: "1px solid white",
      borderWidth: "0px 3px 3px 0px",
      transform: "translate(5px, 2px) rotate(45deg)",
      visibility: props.$checked ? "visible" : "hidden",
    },
  }),
);

export const EmptyBox = styled("div", {
  width: "100%",
  height: "5.5rem",
});
