import { styled } from "styletron-react";

export const InnerContainer = styled("div", {
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr 2fr 2fr 0.5fr",
  gap: "1.5rem",
});

export const UserInfoContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  width: "95%",
  margin: "0 auto",
});

export const Profile = styled("div", {
  position: "relative",
  width: "70%",
  height: "70%",
  minWidth: "3.5rem",
  minHeight: "3.5rem",
  maxWidth: "5rem",
  maxHeight: "5rem",
  margin: "auto",
});

export const UserInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem 0 0 0.5rem",
  gap: "0.6rem",
});

export const UserNameWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

export const UserName = styled("p", (props: { $borderColor: string }) => ({
  fontSize: "0.9rem",
  fontWeight: "bold",
  paddingBottom: "0.3rem",
  borderBottom: `3px solid ${props.$borderColor}`,
}));

export const SocialLoginState = styled("div", {
  backgroundColor: "orange",
  color: "#fff",
  fontSize: "0.8rem",
  borderRadius: "10px",
  padding: "0.2rem",
});

export const UserStateWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
});

export const UserState = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "3rem",
});

export const UserInfoItemCount = styled("p", {
  fontSize: "1.6rem",
});

export const UserInfoItem = styled("p", {
  fontSize: "0.9rem",
  color: "gray",
});

export const ContentContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    position: "relative",
    padding: "1rem 1.5rem",
    border: `1px solid ${props.$borderColor}`,
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
  }),
);

export const ContentClip = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  width: "7rem",
  height: "1.8rem",
  left: "0",
  top: "0",
  transform: "translate(0.1rem, -1rem)",
  backgroundColor: props.$bgColor,
  borderRadius: "1rem",
  fontWeight: "bold",
  fontSize: "1.1rem",
}));

export const MedicineBadgeContainer = styled("div", {
  width: "100%",
  height: "90%",
  maxHeight: "11rem",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    visibility: "hidden",
    width: "0",
  },
  "::-webkit-scrollbar-thumb": {
    visibility: "hidden",
  },
});

export const PharmarcyContainer = styled("div", {
  textAlign: "center",
  // width: "100%",
  height: "100%",
  margin: "0.8rem auto 1rem auto",
});

export const PharmarcyWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  // alignContent: "stretch",
  // height: "100%",
  backgroundColor: "orange",
});
