import { styled } from "styletron-react";

export const ContentContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "3rem auto",
  width: "100%",
  height: "100%",
});

export const TitleContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "2fr 1fr",
  alignItems: "center",
  justifyContent: "center",
  rowGap: "0.2rem",
});

export const Title = styled("h1", (props: { $txtColor: string }) => ({
  color: props.$txtColor,
  fontSize: "1.1rem",
  fontWeight: "bold",
}));

export const UnderLine = styled("div", (props: { $bgColor: string }) => ({
  backgroundColor: props.$bgColor,
  width: "3rem",
  height: "0.2rem",
  justifySelf: "center",
}));

export const ListContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 8fr 1fr",
  height: "70vh",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignSelf: "center",
});

export const Label = styled("label", {
  fontSize: "0.8rem",
});

export const DeleteBtn = styled("button", {
  backgroundColor: "#FF0000",
  color: "#fff",
});

export const Body = styled("div", (props: { $scrollColor: string }) => ({
  height: "100%",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    backgroundColor: "transparent",
    width: "0.7rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: props.$scrollColor,
    borderRadius: "20px",
  },
}));

export const List = styled("div", {
  display: "grid",
  gridTemplateColumns: "1.3rem auto",
  marginBottom: "0.5rem",
});

export const MessageContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    width: "95%",
    border: `1px solid ${props.$borderColor}`,
    borderRadius: "20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    height: "5.5rem",
    justifyItems: "center",
    alignItems: "center",
  }),
);

export const Message = styled("p", {
  lineHeight: 1.2,
  gridRow: "1/4",
});

export const SettingBtn = styled("button", (props: { $btnColor: string }) => ({
  backgroundColor: props.$btnColor,
  color: "#fff",
  borderRadius: "20px",
  gridRow: "1/2",
  fontSize: "0.7rem",
  fontWeight: 100,
}));

export const CheckBtn = styled("button", (props: { $btnColor: string }) => ({
  color: props.$btnColor,
  justifySelf: "end",
  marginRight: "0.5rem",
  display: "flex",
  alignSelf: "center",
}));

export const CheckBtnText = styled("p", {
  fontSize: "0.7rem",
  marginRight: "3px",
});

export const Time = styled("p", (props: { $txtColor: string }) => ({
  fontSize: "0.5rem",
  color: props.$txtColor,
  alignSelf: "end",
  paddingBottom: "0.5rem",
  gridRow: "3/4",
}));

export const MoreBtn = styled("button", (props: { $btnColor: string }) => ({
  backgroundColor: props.$btnColor,
  color: "#fff",
  width: "90%",
  height: "60%",
  justifySelf: "center",
  alignSelf: "end",
}));
