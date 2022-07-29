import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $headerHeight: string; $footerHeight: string }) => ({
    width: "100vw",
    height: `calc(100vh - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const FindWithImageContainer = styled(
  "div",
  (props: { $bgColor: string; $isWide: boolean }) => ({
    display: "grid",
    gridTemplateRows: "1fr 1fr",

    height: "100%",
    margin: "auto",

    backgroundColor: props.$isWide ? props.$bgColor : "transparent",
  }),
);

export const Camera = styled(
  "section",
  (props: { $bgColor: string; $isWide: boolean }) => ({
    backgroundColor: props.$bgColor,
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    width: props.$isWide ? "70%" : "100%",
  }),
);

export const ImageWrapper = styled("div", {
  position: "relative",
  width: "80%",
  height: "80%",
  maxWidth: "16rem",
  maxHeight: "16rem",
  border: "1px solid black",
  borderRadius: "50%",
  margin: "0 auto",
});

export const DescriptionContainer = styled(
  "div",
  (props: { $isWide: boolean }) => ({
    backgroundColor: "#fff",
  }),
);

export const Description = styled("section", (props: { $isWide: boolean }) => ({
  display: "grid",
  gridTemplateRows: "0.7fr 1fr 1fr 0.3fr",
  padding: "1.3rem",
  width: props.$isWide ? "70%" : "100%",
  margin: "0 auto",
  backgroundColor: "#fff",
  height: "100%",
}));

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

export const DescriptionFirstBox = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "0.15fr 0.85fr",
    alignItems: "center",

    width: "90%",
    margin: "0.4rem auto",
    padding: "0.5rem",
    borderRadius: "1.5rem",

    backgroundColor: props.$bgColor,
  }),
);

export const Number = styled("p", {
  textAlign: "center",
  color: "#fff",
  fontWeight: "bold",
});

export const DescriptionContent = styled("p", {
  fontSize: "0.9rem",
  fontWeight: "bold",
  lineHeight: "1.2rem",
  marginRight: "1rem",
});

export const DescriptionSecondBox = styled(
  "div",
  (props: { $bgColor: string }) => ({
    margin: "0.4rem auto",
    width: "90%",
    backgroundColor: props.$bgColor,
    borderRadius: "1.5rem",
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "0.2fr 0.8fr",
    alignItems: "center",
  }),
);

export const ModalInner = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2.5fr 2.5fr 0.5fr",
  height: "90vh",
  backgroundColor: "#fff",
  padding: "0.5rem",
});

export const ModalTitleBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const ModalTitle = styled("h1", {
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "darkgrey",
});
export const ModalGuideBox = styled("div", {});
export const GuideDescriptionBox = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    margin: "0 auto",
    width: "95%",
    height: "25%",

    borderRadius: "1.5rem",

    backgroundColor: props.$bgColor,
  }),
);
export const GuideNumber = styled("p", {
  color: "#fff",
  flex: "0.15",
  textAlign: "center",
});

export const Guide = styled("p", (props: { $isWide: boolean }) => ({
  color: "#000",
  flex: "0.85",
  fontSize: props.$isWide ? "1.2rem" : "15px",
}));

export const GuideImageWrapper = styled("div", {
  position: "relative",
  width: "50%",
  maxWidth: "15rem",
  height: "60%",
  maxHeight: "15rem",
  border: "1px solid",
  margin: "1rem auto",
});

export const GuideTwoImageWrapper = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 0.3fr",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "1rem",
  justifyItems: "center",
  alignItems: "center",
  position: "relative",
  width: "80%",
  height: "70%",

  margin: "0 auto",
});

export const CorrectImage = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",
  maxHeight: "7rem",
  maxWidth: "7rem",
  border: "1px solid",
});
export const WrongImage = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",
  maxHeight: "7rem",
  maxWidth: "7rem",
  border: "1px solid",
});

export const ModalFooter = styled("div", {});
