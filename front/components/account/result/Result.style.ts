import { styled } from "styletron-react";

export const Container = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: props.$bgColor,
  display: "grid",
  gridTemplateRows: "1fr 1.5fr 0.5fr",
}));
