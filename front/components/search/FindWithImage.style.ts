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
  margin: "auto",
});

export const Camera = styled("section", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
}));

export const Description = styled("section", {
  display: "grid",
  gridTemplateRows: "0.7fr 1fr 1fr 0.3fr",
  padding: "1.3rem",
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

export const DescriptionFirstBox = styled(
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

export const Number = styled("span", {
  textAlign: "center",
  color: "#fff",
  fontWeight: "bold",
});

export const DescriptionContent = styled("p", {
  fontSize: "0.9rem",
  fontWeight: "bold",
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
