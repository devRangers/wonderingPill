import { styled } from "styletron-react";

export const Container = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr 2fr 15fr",
  minHeight: "60vh",
});

export const CloseBtn = styled("button", {
  justifySelf: "end",
  padding: "0.5rem 1rem",
  cursor: "pointer",
});

export const ImageContainer = styled("div", {
  justifySelf: "center",
});

export const BtnContainer = styled("div", {
  width: "80%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
  alignItems: "center",
});

export const CategoryBtn = styled("button", (props: { $btnColor: string }) => ({
  backgroundColor: props.$btnColor,
  color: "#fff",
  width: "80%",
  height: "3.5rem",
  fontSize: "1.1rem",
  borderRadius: "20px",
  transition: "all 200ms",
  cursor: "pointer",
}));

export const InfoContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    border: `5px solid ${props.$borderColor}`,
    width: "75%",
    height: "90%",
    alignSelf: "center",
    justifySelf: "center",
  }),
);
