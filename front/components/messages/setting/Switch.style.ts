import { styled } from "styletron-react";

export const ToggleBtn = styled("button", {
  width: "2.5rem",
  height: "1.2rem",
  border: "1px solid #A4A4A4",
  borderRadius: "50px",
  padding: 0,
});

export const Ball = styled(
  "div",
  (props: { $bgColor: string; $isToggle: boolean }) => ({
    width: "0.9rem",
    height: "0.9rem",
    borderRadius: "50px",
    backgroundColor: props.$bgColor,
    margin: "0 0.1rem",
    transition: "all 0.3s ease-in-out",
    transform: props.$isToggle ? "translateX(1.3rem)" : "",
  }),
);
