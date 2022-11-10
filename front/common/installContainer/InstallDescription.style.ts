import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $descriptionLength: number }) => ({
    display: "grid",
    gridTemplateRows: `repeat(${props.$descriptionLength}, 1fr)`,
    rowGap: "1rem",
    minHeight: "100%",
    overflowY: "auto",
  }),
);

export const DescriptionContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 10fr",
  rowGap: "1rem",
  justifyItems: "center",
  alignItems: "center",
  padding: "1rem 0",
});

export const ImageContainer = styled("div", {
  width: "100%",
  height: "100%",
  position: "relative",
});

export const TextContainer = styled("div", (props: { $bgColor: string }) => ({
  width: "80%",
  height: "3rem",
  borderRadius: "25px",
  backgroundColor: props.$bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Text = styled("p", {
  color: "#fff",
});
