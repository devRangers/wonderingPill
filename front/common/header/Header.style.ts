import { styled } from "styletron-react";

export const HeaderContainer = styled(
  "header",
  (props: { $height: string }) => ({
    position: "fixed",
    width: "100vw",
    height: props.$height,
    backgroundColor: "yellow",
  }),
);

export const HeaderEmptyBox = styled(
  "header",
  (props: { $height: string }) => ({
    height: props.$height,
  }),
);
