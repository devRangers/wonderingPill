import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@utils/constant";
import { styled } from "styletron-react";

export const MainContainer = styled("div", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  minHeight: `calc(100vh - (${HEADER_HEIGHT} + ${FOOTER_HEIGHT}))`,
}));
