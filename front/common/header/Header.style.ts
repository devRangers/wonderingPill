import { styled } from "styletron-react";

export const HeaderContainer = styled(
  "header",
  (props: { $height: string; $bgColor: string }) => ({
    width: "100vw",
    minHeight: props.$height,
    backgroundColor: props.$bgColor,

    padding: "0.7rem",

    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "start",
    alignItems: "center",
    zIndex: 3,
  }),
);

export const ImageWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  height: "100%",
});

export const HamburgerBtn = styled("button", {
  fontSize: "2rem",
  color: "#fff",
  zIndex: 3,
});

export const BellBtn = styled("button", {
  fontSize: "1.5rem",
  color: "#fff",
  justifySelf: "end",
});

export const Button = styled("button", {
  position: "relative",
  width: "100%",
  height: "100%",
});
