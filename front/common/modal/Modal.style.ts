// @ts-nocheck
import { styled } from "styletron-react";

export const Background = styled("div", (props: { $isOpen: boolean }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.5)",
  visibility: props.$isOpen ? "visible" : "hidden",
  zIndex: 2,
  transition: "visibility 0.15s ease-out",
}));

export const ModalContainer = styled(
  "div",
  (props: { $isOpen: boolean; $isWide: boolean; $isInfoPage?: boolean }) => ({
    position: "fixed",
    width: props.$isWide ? "60vw" : "85vw",
    maxHeight: props.$isInfoPage ? "80vh" : "",
    overflowY: props.$isInfoPage ? "auto" : "",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    zIndex: 3,
    visibility: props.$isOpen ? "visible" : "hidden",
    transition: "visibility 0.15s ease-out",
    animationDuration: "0.2s",
    animationTimingFunction: "ease-out",
    animationName: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  }),
);
