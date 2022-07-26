import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@utils/constant";
import { styled } from "styletron-react";

export const MainContainer = styled("div", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  height: `calc(100vh - (${HEADER_HEIGHT} + ${FOOTER_HEIGHT}))`,
}));

export const MainContent = styled("div", {
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr 4fr",
});

export const ImageSection = styled("section", {
  position: "relative",
  margin: "0 auto",
  width: "60%",
});
export const MainSection = styled("section", {});
