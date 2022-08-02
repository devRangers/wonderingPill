import { styled } from "styletron-react";

export const HeaderContainer = styled(
  "header",
  (props: { $height: string; $bgColor: string }) => ({
    position: "fixed",
    width: "100vw",
    height: props.$height,
    backgroundColor: props.$bgColor,

    padding: "0.7rem",

    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "start",
    alignItems: "center",
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
  zIndex: "1",
});

export const BellBtn = styled("button", {
  fontSize: "1.5rem",
  color: "#fff",
  justifySelf: "end",
});

export const HeaderEmptyBox = styled(
  "header",
  (props: { $height: string }) => ({
    width: "100vw",
    height: props.$height,
  }),
);
