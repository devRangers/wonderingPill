import { styled } from "styletron-react";

export const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "40px 2fr 1fr",
  minHeight: "70vh",
});

export const ServiceNameContainer = styled(
  "div",
  (props: { $bgColor: string }) => ({
    backgroundColor: props.$bgColor,
    height: "25%",
    writingMode: "vertical-rl",
    letterSpacing: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    marginTop: "50px",
  }),
);

export const ServiceName = styled("h1", {
  color: "#fff",
  marginBottom: "0.5rem",
});

export const FirstServiceInfo = styled("div", {
  width: "90%",
  height: "90%",
  justifySelf: "center",
  display: "grid",
  gridTemplateRows: "0.7fr 1.3fr 1fr",
});

export const TitleContainer = styled("div", (props: { $align: string }) => ({
  alignSelf: props.$align,
}));

export const SubTitle = styled("h1", (props: { $white?: boolean }) => ({
  color: props.$white ? "#fff" : "#000",
}));

export const Title = styled("h1", (props: { $white?: boolean }) => ({
  fontSize: "2rem",
  marginTop: "0.5rem",
  color: props.$white ? "#fff" : "#000",
  lineHeight: 1.2,
}));

export const Highlights = styled("span", (props: { $txtColor: string }) => ({
  color: props.$txtColor,
  fontWeight: "bold",
}));

export const ImageContainer = styled(
  "div",
  (props: { $width: string; $height: string }) => ({
    position: "relative",
    width: props.$width,
    height: props.$height,
    borderRadius: "20px",
    overflow: "hidden",
  }),
);

export const InfoContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr",
  alignItems: "center",
  columnGap: "1rem",
});

export const Description = styled("p", (props: { $white?: boolean }) => ({
  lineHeight: 1.5,
  color: props.$white ? "#fff" : "#000",
}));

export const SecondServiceInfo = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "grid",
    gridTemplateRows: "50px auto",
    backgroundColor: props.$bgColor,
  }),
);

export const CloseBtn = styled("button", {
  color: "#fff",
  cursor: "pointer",
  justifySelf: "end",
  marginRight: "1rem",
});

export const ContentContainer = styled("div", {
  width: "80%",
  height: "90%",
  display: "grid",
  gridTemplateRows: "1fr 1fr 0.5fr",
  justifySelf: "center",
});
