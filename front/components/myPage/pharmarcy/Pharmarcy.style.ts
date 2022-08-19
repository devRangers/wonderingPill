import { styled } from "styletron-react";

export const PharmarcyContainer = styled("div", {
  alignItems: "center",
  display: "flex",
  padding: "0.8rem",
  height: "100%",
  margin: "0 auto",
});

export const DataContainer = styled("div", {
  flex: 0.7,
  textAlign: "start",
});

export const Name = styled("div", {
  fontSize: "1.3rem",
  fontWeight: "bold",
  lineHeight: "1.3rem",
  marginBottom: "0.5rem",
});

export const PhoneNumber = styled("div", {
  fontSize: "0.7rem",
  lineHeight: "1.3rem",
});

export const HeartContainer = styled("div", {
  flex: 0.3,
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "1.5rem",
  lineHeight: "1.3rem",
});
