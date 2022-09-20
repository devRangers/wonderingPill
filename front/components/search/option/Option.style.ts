import { styled } from "styletron-react";

export const Container = styled("div", {
  minHeight: "100vh",
  padding: "1.3rem 1.8rem",
  gap: "0.5rem",
});

export const TitleContainer = styled("section", {
  display: "flex",
  height: "4.5rem",
  position: "relative",
  marginBottom: "0.5rem",
});

export const TitleContent = styled("section", {
  flex: "0.7",
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
});

export const Title = styled("h1", (props: { $color: string }) => ({
  color: props.$color,
  fontSize: "1.5rem",
}));

export const Description = styled("p", (props: { $color: string }) => ({
  color: props.$color,
  fontSize: "0.5rem",
}));

export const TopBorder = styled("div", (props: { $borderColor: string }) => ({
  height: "2px",
  width: "15%",
  backgroundColor: props.$borderColor,
}));

export const ImageContainer = styled("div", {
  flex: 0.3,
  position: "relative",
});

export const MainContent = styled(
  "section",
  (props: { $borderColor: string }) => ({
    display: "grid",
    gridTemplateRows: "3fr 3fr 1fr 3fr",
    gap: "1rem",
    border: `2px solid ${props.$borderColor}`,
    borderRadius: "4rem",
    padding: "2rem 1.5rem",
  }),
);

export const OptionContainer = styled("div", {
  display: "grid",
  gap: "1rem",
});

export const OptionTitle = styled("h2", (props: { $color: string }) => ({
  marginLeft: "0.3rem",
  color: props.$color,
}));

export const ButtonContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(3rem, 1fr))",
  gap: "1rem",
});

export const OptionButton = styled(
  "button",
  (props: { $bgColor: string; $color: string; $isSelected: boolean }) => ({
    backgroundColor: props.$isSelected ? props.$bgColor : "#fff",
    fontSize: "0.6rem",
    color: props.$isSelected ? "#fff" : props.$color,
    border: `1px solid ${props.$bgColor}`,
    borderRadius: "2rem",
    height: "1.5rem",
  }),
);

export const Form = styled("form", {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  alignItems: "center",
});

export const InputWrapper = styled("div", (props: { $color: string }) => ({
  display: "flex",
  color: props.$color,
  fontWeight: "bold",
}));

export const Label = styled("label", {
  flex: 0.3,
  textAlign: "center",
});

export const Input = styled("input", (props: { $borderColor: string }) => ({
  flex: 0.6,
  border: "none",
  borderBottom: `2px solid ${props.$borderColor}`,
  ":focus": {
    outline: "none",
  },
}));

export const Button = styled("button", (props: { $bgColor: string }) => ({
  width: "55%",
  height: "2.5rem",
  color: "#fff",
  backgroundColor: props.$bgColor,
  margin: "0 auto",
  borderRadius: "2rem",
}));
