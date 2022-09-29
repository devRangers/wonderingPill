import { styled } from "styletron-react";

export const Container = styled("div", {
  width: "90%",
  margin: "0 auto",
  display: "grid",
  gridTemplateRows: "1fr 1.5fr 1fr 2.5fr 0.5fr",
  rowGap: "1rem",
});

export const TitleContainer = styled("div", (props: { $bgColor: string }) => ({
  width: "80%",
  height: "70%",
  alignSelf: "end",
  justifySelf: "center",
  borderRadius: "20px",
  backgroundColor: props.$bgColor,
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const InfoContaniner = styled("div", {
  display: "grid",
  gridTemplateRows: "2rem auto",
});

export const InfoTitle = styled("div", (props: { $bgColor: string }) => ({
  width: "40%",
  backgroundColor: props.$bgColor,
  color: "#fff",
  textAlign: "center",
  borderRadius: "15px",
  padding: "0.5rem 1rem",
}));

export const InfoContent = styled("div", (props: { $borderColor: string }) => ({
  minHeight: "3rem",
  border: `2px solid ${props.$borderColor}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: 1.2,
  textAlign: "center",
}));

export const CloseBtnContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const CloseBtn = styled("button", (props: { $btnColor: string }) => ({
  color: props.$btnColor,
}));
