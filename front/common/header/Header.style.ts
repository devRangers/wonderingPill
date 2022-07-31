import { BsFillBellFill, BsJustify } from "react-icons/bs";
import { styled } from "styletron-react";

export const HeaderContainer = styled(
  "header",
  (props: { $height: string; $bgColor: string }) => ({
    position: "fixed",
    width: "100vw",
    height: props.$height,
    backgroundColor: props.$bgColor,

    padding: "0.7rem",
    fontSize: "2rem",
    color: "#fff",

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

export const HamburgerBtn = styled(BsJustify, {
  zIndex: "1",
});

export const BellBtn = styled(BsFillBellFill, {
  justifySelf: "end",
});

export const HeaderEmptyBox = styled(
  "header",
  (props: { $height: string }) => ({
    width: "100vw",
    height: props.$height,
  }),
);
