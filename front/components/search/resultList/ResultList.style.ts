import { styled } from "styletron-react";

export const OuterContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $fullHeight: string;
    $footerHeight: string;
  }) => ({
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
    padding: "2rem",
  }),
);

export const Container = styled("div", (props: { $borderColor: string }) => ({
  width: "100%",
  height: "100%",
  border: `2px solid ${props.$borderColor}`,
  borderRadius: "1rem",
  padding: "0 1rem 0 1rem",
  margin: "0 auto",
}));

export const ContainerHeader = styled("section", {
  display: "flex",
  alignItems: "center",
  height: "3rem",
  padding: "1rem 0",
  columnGap: "1rem",
});

export const DotWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "20%",
  height: "100%",
});

export const TotalSearchCount = styled("div", {
  fontSize: "0.7rem",
});

export const Dot = styled("div", (props: { $bgColor: string }) => ({
  width: "0.8rem",
  height: "0.8rem",
  borderRadius: "50%",
  backgroundColor: props.$bgColor,
}));

export const InnerContainer = styled(
  "div",
  (props: { $scrollColor: string; $bgColor: string }) => ({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    rowGap: "0.3rem",
    height: "calc(100% - 4rem)",
    backgroundColor: props.$bgColor,
    borderRadius: "1rem",
    padding: "1rem",
    overflow: "hidden",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "0.9rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: props.$scrollColor,
      borderRadius: "20px",
    },
  }),
);

export const Item = styled("section", (props: { $borderColor: string }) => ({
  display: "flex",
  height: "4rem",
  width: "100%",
  border: `1px solid ${props.$borderColor}`,
  borderRadius: "1rem",
}));

export const PillImageSection = styled("div", {
  flex: "0.5",
  padding: "0.5rem 1rem",
});

export const ImageWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

export const DescribeSection = styled("div", {
  flex: "0.5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.7rem",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
});
