import { styled } from "styletron-react";

export const InnerContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "0.6fr 1.3fr 1fr 0.3fr",
  gap: "1rem",
});

export const UserInfoContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  width: "95%",
  margin: "0 auto",
});

export const Profile = styled("div", {
  position: "relative",
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

export const MedicationContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    border: `1px solid ${props.$borderColor}`,
    borderRadius: "10px",
  }),
);

export const MedicationClip = styled("div", (props: { $bgColor: string }) => ({
  position: "relative",
  width: "7rem",
  height: "2rem",
  borderRadius: "1rem",
  transform: "translate(0.1rem, -1rem)",
  backgroundColor: props.$bgColor,
}));
