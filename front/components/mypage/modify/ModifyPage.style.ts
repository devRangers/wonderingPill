import { styled } from "styletron-react";

export const ModifyContainer = styled("div", {
  position: "relative",
  width: "90%",
  margin: "0 auto",
});

export const BorderLine = styled("div", (props: { $borderColor: string }) => ({
  position: "absolute",
  width: "20%",
  height: "2px",
  backgroundColor: props.$borderColor,
  top: "-10px",
  left: "4%",
}));

export const Form = styled("form", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
});

export const ModifyItem = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});
export const ItemName = styled("p", {
  flex: "0.4",
  paddingLeft: "4%",
  fontWeight: "bold",
});

export const ItemContent = styled("p", {
  flex: "0.6",
});

export const ItemWrapper = styled("div", {
  flex: "0.6",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const ItemInput = styled("input", {
  flex: "0.6",
});

export const ErrorMesasge = styled("p", {
  position: "absolute",
  top: "100%",
  marginTop: "1px",
  fontSize: "0.5rem",
  color: "#bd0000",
});

export const ModifyButton = styled(
  "button",
  (props: { $buttonColor: string }) => ({
    width: "18%",
    height: "1.5rem",
    backgroundColor: props.$buttonColor,
    borderRadius: "10px",
    alignSelf: "flex-end",
  }),
);

export const BottomContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  width: "90%",
  margin: "0 auto",
});
export const CustomerContainer = styled("div", {
  position: "relative",
  display: "flex",
  width: "100%",
});

export const CustomerContainerLeftSide = styled("div", {
  flex: "0.7",
  padding: "0.4rem 4%",
});

export const LeftSideTitle = styled("h2", {
  fontWeight: "bold",
  marginBottom: "0.4rem",
});

export const LeftSideContent = styled("div", {
  fontSize: "0.6rem",
  lineHeight: "0.8rem",
  color: "gray",
});

export const CustomerContainerRightSide = styled("div", {
  flex: "0.3",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const CustomerButton = styled(
  "button",
  (props: { $buttonColor: string }) => ({
    width: "5rem",
    height: "1.5rem",
    backgroundColor: props.$buttonColor,
    borderRadius: "10px",
  }),
);
