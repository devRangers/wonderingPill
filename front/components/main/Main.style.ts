import { styled } from "styletron-react";

export const MainContainer = styled("div", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  minHeight: "calc(100vh - 4rem)",
}));
