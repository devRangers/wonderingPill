import { styled } from "styletron-react";

export const Container = styled("div", {
  width: "100vw",
  height: "100vh",
});

export const Filter = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: props.$bgColor,
  opacity: 0.7,
}));

export const InfoContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "3fr 5fr 1fr",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "45vw",
  height: "60vh",
});

export const Text = styled("h1", {
  color: "#fff",
  textAlign: "center",
  fontWeight: 600,
  fontSize: "2rem",
  lineHeight: 1.5,
  alignSelf: "end",
});

export const Button = styled("button", (props: { $btnColor: string }) => ({
  border: `4px solid ${props.$btnColor}`,
  borderRadius: "50px",
  backgroundColor: "rgba(255,255,255,0.15)",
  color: props.$btnColor,
  width: "70%",
  minHeight: "4rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  justifySelf: "center",
  cursor: "pointer",
  outline: `4px solid ${props.$btnColor}`,
  outlineOffset: "-4px",
  transition: "outline-offset 200ms ease",
  ":hover": {
    outline: `4px solid ${props.$btnColor}`,
    outlineOffset: "4px",
  },
}));

export const BtnContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export const LinkBtn = styled("button", {
  color: "#fff",
  cursor: "pointer",
});
