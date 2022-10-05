import { styled } from "styletron-react";

export const CustomerCenterModalInner = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 3fr",
  justifyItems: "center",
  alignItems: "center",
  gap: "0.3rem",
  height: "35vh",
  width: "80%",
  padding: "0.5rem",
  margin: "0 auto",
});

export const ModalInner = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 3fr 1fr",
  justifyItems: "center",
  alignItems: "center",
  gap: "0.3rem",
  height: "35vh",
  width: "90%",
  padding: "0.5rem",
  margin: "0 auto",
});

export const ModifyModalInner = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  justifyItems: "center",
  alignItems: "center",
  gap: "0.3rem",
  height: "28vh",
  padding: "0.5rem",
  margin: "0 auto",
  fontWeight: "bold",
});

export const IconWrapper = styled("div", {
  fontSize: "2rem",
  alignSelf: "flex-end",
});

export const Title = styled("h1", (props: { $color: string }) => ({
  fontSize: "1.2rem",
  fontWeight: "600",
  color: props.$color,
}));

export const Form = styled("form", {
  display: "grid",
  gridTemplateRows: "3fr 1fr",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

export const TextArea = styled("textarea", {
  width: "100%",
  height: "100%",
  fontWeight: "600",
  resize: "none",
  border: "1px solid gray",
  padding: "0.8rem",
});

export const TextContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  height: "100%",
  alignItems: "center",
  lineHeight: "1.4rem",
});

export const Bottom = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const CloseButton = styled("button", {
  color: "gray",
});

export const SubmitButton = styled("button", (props: { $bgColor: string }) => ({
  justifySelf: "flex-end",
  width: "5rem",
  height: "1.6rem",
  borderRadius: "10px",
  color: "#fff",
  backgroundColor: props.$bgColor,
}));
