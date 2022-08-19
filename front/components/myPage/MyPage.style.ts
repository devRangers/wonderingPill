import { styled } from "styletron-react";

export const InnerContainer = styled(
  "div",
  (props: { $gridTemplateRows: string }) => ({
    height: "100%",
    display: "grid",
    gridTemplateRows: props.$gridTemplateRows,
    gap: "1.5rem",
  }),
);

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
  fontSize: "0.8rem",
  fontWeight: "bold",
  paddingBottom: "0.3rem",
  borderBottom: `3px solid ${props.$borderColor}`,
}));

export const SocialLoginState = styled("div", {
  backgroundColor: "orange",
  color: "#fff",
  fontSize: "0.6rem",
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
  minHeight: "2.4rem",
});

export const UserInfoItemCount = styled("p", {
  fontSize: "1.3rem",
});

export const UserInfoItem = styled("p", {
  fontSize: "0.9rem",
  color: "gray",
});

export const ContentContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
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
  width: "6rem",
  height: "1.5rem",
  left: "0",
  top: "0",
  transform: "translate(0.1rem, -1rem)",
  backgroundColor: props.$bgColor,
  borderRadius: "1rem",
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

export const MedicineBadgeContainer = styled("div", {
  width: "100%",
  height: "80%",
  maxHeight: "20vh",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    visibility: "hidden",
    width: "0",
  },
});

export const PharmarcyContainer = styled("div", {
  textAlign: "center",
  height: "100%",
  maxHeight: "20vh",
  margin: "1rem auto 0.5rem auto",
});

export const PharmarcyWrapper = styled("div", {
  height: "15vh",
  width: "100px",
});

export const BottomContainer = styled("div", {
  textAlign: "end",
});

export const ModifyUserDataButton = styled("button", {
  width: "7rem",
  height: "1.5rem",
  backgroundColor: "orange",
  borderRadius: "1rem",
});
