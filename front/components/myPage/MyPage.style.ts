import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: {
    $bgColor: string;
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    backgroundColor: props.$bgColor,
    height: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
  }),
);

export const InnerContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1.3fr 1fr 0.3fr",
  width: "95vw",
  height: "100%",
  margin: "0 auto",
  padding: "1.2rem",
  borderRadius: "8px",
  backgroundColor: "#fff",
});

export const ProfileContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
});

export const Profile = styled("div", {});
