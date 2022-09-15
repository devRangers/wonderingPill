import { styled } from "styletron-react";

export const Container = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr 15fr",
  minHeight: "60vh",
});

export const CloseBtn = styled("button", {
  justifySelf: "end",
  padding: "0.5rem 1rem",
  cursor: "pointer",
});

export const ImageContainer = styled("div", (props: { $logo?: boolean }) => ({
  width: "100%",
  height: "80%",
  position: "relative",
  alignSelf: props.$logo ? "start" : "end",
}));

export const TeamInfoContainer = styled("div", {
  width: "80%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1.3fr",
});

export const TeamContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "3fr 1fr 1.4fr",
});

export const TeamTitle = styled("div", {
  display: "grid",
  gridTemplateRows: "1.2fr 1fr",
});

export const TeamName = styled("h1", {
  fontSize: "1.4rem",
  fontWeight: 900,
  alignSelf: "center",
});

export const TeamDescription = styled("p", {
  lineHeight: 1.3,
});

export const MemberContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "repeat(5, 1fr)",
  width: "90%",
  height: "90%",
  margin: "0 auto",
  alignSelf: "center",
  rowGap: "0.5rem",
});

export const MemberInfo = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
});

export const ProfileContainer = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",
});

export const ProfileImageContainer = styled("div", {
  position: "relative",
  borderRadius: "50px",
  width: "90%",
  height: "90%",
  overflow: "hidden",
  margin: "auto",
});

export const IconBtn = styled("button", {
  position: "absolute",
  right: 0,
  bottom: 0,
  fontSize: "1.5rem",
  cursor: "pointer",
  backgroundColor: "#fff",
  borderRadius: "50px",
});

export const Info = styled("div", {
  height: "80%",
  alignSelf: "center",
  marginLeft: "1rem",
  display: "grid",
  gridTemplateRows: "repeat(3, 1fr)",
});

export const Name = styled("h1", {
  fontSize: "1.1rem",
});
