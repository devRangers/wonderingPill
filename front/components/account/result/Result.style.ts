import { styled } from "styletron-react";

export const Container = styled("div", (props: { $bgColor: string }) => ({
  width: "100vw",
  height: "calc(var(--vh, 1vh) * 100)",
  backgroundColor: props.$bgColor,
  display: "grid",
  gridTemplateRows: "1fr 1.4fr 0.6fr",
}));

export const TitleContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr 0.5fr 1fr",
  justifyItems: "center",
  alignItems: "center",
});

export const Title = styled("h1", (props: { $txtColor: string }) => ({
  gridRowStart: 2,
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: props.$txtColor,
}));

export const SubTitle = styled("p", {
  gridRowStart: 3,
  color: "#fff",
});

export const ResultContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr 0.7fr",
  justifySelf: "center",
  justifyItems: "center",
  alignItems: "center",
  width: "80%",
  height: "100%",
  backgroundColor: "#fff",
  borderRadius: "20px",
});

export const Description = styled("p", {
  fontSize: "1rem",
  lineHeight: "150%",
  textAlign: "center",
});

export const ResultBox = styled(
  "div",
  (props: { $isWide: boolean; $isDivide: boolean }) => ({
    display: "grid",
    gridTemplateRows: props.$isDivide ? "1fr 1fr" : "",
    width: props.$isWide ? "70%" : "90%",
    height: "90%",
    border: "1px solid #000",
    justifyItems: "center",
    alignItems: "center",
    overflowX: "auto",
  }),
);

export const InfoContaniner = styled("div", (props: { $isWide: boolean }) => ({
  display: "grid",
  gridTemplateColumns: props.$isWide ? "5rem auto" : "3rem auto",
  width: "100%",
  justifyItems: "center",
}));

export const InfoTitle = styled("p", {
  color: "#3E3E3E",
  fontWeight: "bold",
});

export const NoResultMsg = styled("p", {
  width: "90%",
  lineHeight: "150%",
});

export const BtnContainer = styled("div", (props: { $isWide: boolean }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  justifySelf: "center",
  width: props.$isWide ? "80%" : "100%",
  alignItems: "center",
  justifyItems: "center",
}));

export const LinkButton = styled(
  "button",
  (props: { $btnColor: string; $isWide: boolean }) => ({
    backgroundColor: props.$btnColor,
    borderRadius: "25px",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: props.$isWide ? "1rem 2rem" : "0.7rem 1rem",
  }),
);
