import { styled } from "styletron-react";

export const MedicineBadge = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto 0.8rem auto",
    padding: "0.2rem 0.4rem 0.2rem 0.4rem",
    border: `1px solid ${props.$borderColor}`,
    fontSize: "0.8rem",
  }),
);

export const AlarmButton = styled("button", (props: { $bgColor: string }) => ({
  fontSize: "0.7rem",
  backgroundColor: props.$bgColor,
  color: "#fff",
  borderRadius: "10px",
}));
