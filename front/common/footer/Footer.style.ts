import { styled } from "styletron-react";

export const FooterContainer = styled(
  "footer",
  (props: { $bgColor: string; $height: string }) => ({
    width: "100vw",
    height: props.$height,
    backgroundColor: props.$bgColor,
    color: "#222",
    fontSize: "1rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
);
