import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: {
    $fullHeight: string;
    $headerHeight: string;
    $footerHeight: string;
    $bgColor: string;
  }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
    backgroundColor: props.$bgColor,
  }),
);

export const Card = styled("div", {
  width: "80vw",
  height: "45vh",
  display: "grid",
  gridTemplateRows: "2fr 1fr 2.5fr 1.2fr",
  justifyItems: "center",
  alignItems: "center",
  padding: "1rem 0",
  backgroundColor: "#fff",
  borderRadius: "20px",
});

export const Icon = styled("div", (props: { $iconColor: string }) => ({
  fontSize: "2.5rem",
  color: props.$iconColor,
}));

export const Title = styled("h1", {
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const Description = styled("pre", {
  textAlign: "center",
  lineHeight: 1.2,
  color: "#434343",
});

export const Message = styled("pre", {
  fontSize: "0.9rem",
  fontWeight: "bold",
});
