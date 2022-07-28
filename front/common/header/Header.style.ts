import { BsJustify } from "react-icons/bs";
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

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
);

export const HamburgerBtn = styled(BsJustify, {
  zIndex: "1",
});

export const HeaderEmptyBox = styled(
  "header",
  (props: { $height: string }) => ({
    width: "100vw",
    height: props.$height,
  }),
);
