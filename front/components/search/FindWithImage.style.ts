import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $headerHeight: string; $footerHeight: string }) => ({
    width: "100vw",
    height: `calc(100vh - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const FindWithImageContainer = styled("div", {
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  width: "80%",
  margin: "auto",
});

export const Camera = styled("section", {
  border: "1px solid black",
});

export const Description = styled("section", {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr 0.6fr",
  border: "1px solid black",
});

export const DescriptionTitle = styled("div", {
  position: "relative",
});
export const TitleLine = styled("div", (props: { $bgColor: string }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: "35%",
  height: "0.7rem",

  backgroundColor: props.$bgColor,
}));

export const Title = styled("span", {
  position: "absolute",
  left: "2rem",
  top: "1rem",
  fontWeight: "bold",
});

export const DescriptionFirstBox = styled("div", {});

export const DescriptionSecondBox = styled("div", {});
