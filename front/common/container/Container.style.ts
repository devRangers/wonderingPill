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
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const InnerContainer = styled("div", {
  gap: "1rem",
  width: "95vw",
  maxWidth: "500px",
  height: "100%",
  margin: "0 auto",
  padding: "0.8rem",
  borderRadius: "8px",
  backgroundColor: "#fff",
});
