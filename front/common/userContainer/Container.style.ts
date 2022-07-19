import { styled } from "styletron-react";

export const MainContainer = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "grid",
  gridTemplateRows: "1fr 3fr 5fr",
  backgroundColor: props.$bgColor,
}));

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

export const LinkBtn = styled("button", {
  border: 0,
  borderRadius: "25px",
  padding: "0.2rem 0.8rem",
  backgroundColor: "#567BC4",
  color: "#fff",
});

export const LogoContainer = styled("div", {
  position: "relative",
  width: "100%",
});
