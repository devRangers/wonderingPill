import { styled } from "styletron-react";

export const PageContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr repeat(3, 1.5fr)",
  height: "100%",
});

export const Title = styled("h1", (props: { $txtColor: string }) => ({
  color: props.$txtColor,
  textAlign: "center",
  fontSize: "1.5rem",
  marginTop: "1rem",
}));

export const NavButton = styled("button", (props: { $btnColor: string }) => ({
  color: "#fff",
  fontSize: "1.3rem",
  backgroundColor: props.$btnColor,
  borderRadius: "25px",
  height: "70%",
}));
