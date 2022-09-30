import { styled } from "styletron-react";

export const MainContainer = styled(
  "div",
  (props: { $bgColor: string; $fullHeight: string }) => ({
    width: "100vw",
    height: `calc(${props.$fullHeight})`,
    display: "grid",
    gridTemplateRows: "1fr 3fr 5fr",
    backgroundColor: props.$bgColor,
  }),
);

export const HeaderContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: "0.5rem",
});

export const IconBtn = styled("button", (props: { $btnColor: string }) => ({
  border: 0,
  backgroundColor: "transparent",
  fontSize: "2rem",
  fontWeight: "bold",
  color: props.$btnColor,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const LinkBtn = styled("button", (props: { $btnColor: string }) => ({
  border: 0,
  borderRadius: "25px",
  padding: "0.2rem 0.8rem",
  backgroundColor: props.$btnColor,
  color: "#fff",
}));

export const LogoContainer = styled("div", {
  position: "relative",
  width: "100%",
});

export const InputContainer = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateRows: "2.1fr 1fr",
  justifyItems: "center",
});

export const Input = styled(
  "input",
  (props: { $placeholderColor: string }) => ({
    width: "65%",
    height: "3.5rem",
    border: 0,
    borderRadius: "25px",
    fontSize: "1rem",
    padding: "0 1rem",
    "::-webkit-input-placeholder": {
      textAlign: "center",
      color: props.$placeholderColor,
    },
  }),
);

export const ErrorMessage = styled("div", (props: { $txtColor: string }) => ({
  textAlign: "start",
  width: "65%",
  padding: "0.3rem 1rem",
  color: props.$txtColor,
  fontSize: "0.9rem",
}));

export const SubmitBtn = styled("button", (props: { $btnColor: string }) => ({
  width: "65%",
  height: "3.5rem",
  border: 0,
  borderRadius: "25px",
  fontSize: "1rem",
  backgroundColor: props.$btnColor,
  color: "#fff",
  fontWeight: "bold",
}));
