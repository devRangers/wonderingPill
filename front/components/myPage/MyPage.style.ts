import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: {
    $bgColor: string;
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    backgroundColor: props.$bgColor,
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const InnerContainer = styled("div", {
  width: "95vw",
  height: "100%",
  margin: "0 auto",
  borderRadius: "8px",
  backgroundColor: "#fff",
});
