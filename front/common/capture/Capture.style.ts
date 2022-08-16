import { styled } from "styletron-react";

export const CaptureContainer = styled("div", {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
});

export const CaptureButton = styled("label", {
  display: "inline-block",
  width: "100%",
  height: "100%",
});
