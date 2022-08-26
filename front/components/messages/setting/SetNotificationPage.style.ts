import { styled } from "styletron-react";

export const ContentContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 5fr 0.5fr",
  width: "90%",
  height: "100%",
  margin: "0 auto",
});

export const TitleContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr 1fr",
  alignItems: "center",
});

export const TopLine = styled("div", (props: { $bgColor: string }) => ({
  width: "2rem",
  height: "0.2rem",
  alignSelf: "end",
  backgroundColor: props.$bgColor,
}));

export const Title = styled("h1", (props: { $txtColor: string }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: props.$txtColor,
}));

export const LinkBtn = styled("button", (props: { $txtColor: string }) => ({
  justifySelf: "start",
  color: props.$txtColor,
  padding: 0,
}));

export const MessageContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    border: `3px solid ${props.$borderColor}`,
    borderRadius: "50px",
    height: "95%",
    alignSelf: "end",
    display: "grid",
    gridTemplateRows: "1fr 2.3fr 2fr",
    justifyItems: "center",
    alignItems: "center",
  }),
);

export const NotificationForm = styled("div", {
  display: "grid",
  gridTemplateRows: "2fr 1fr",
  alignSelf: "end",
});

export const NotificationTitle = styled(
  "h1",
  (props: { $txtColor: string }) => ({
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: props.$txtColor,
    textAlign: "center",
    alignSelf: "center",
  }),
);

export const Hr = styled("hr", (props: { $borderColor: string }) => ({
  borderTop: `1px solid ${props.$borderColor}`,
  width: "100%",
  opacity: 0.5,
}));

export const FormContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "1fr 2fr",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyItems: "center",
});

export const FormTitle = styled(
  "h1",
  (props: { $txtColor: string; $remind?: boolean }) => ({
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: props.$txtColor,
    textAlign: "center",
    alignSelf: props.$remind ? "end" : "",
  }),
);

export const Form = styled("form", (props: { $height: string }) => ({
  backgroundColor: "#f7f7f7",
  width: "90%",
  height: props.$height,
  borderRadius: "20px",
}));

export const TimeSelectContainer = styled("div", {
  display: "grid",
  gridTemplateRows: "0.5fr 1fr 1fr",
  height: "100%",
  padding: "0.5rem",
  alignItems: "center",
  justifyItems: "center",
});

export const SelectedDays = styled("pre", {
  justifySelf: "end",
  fontSize: "0.7rem",
});

export const BtnContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
});

export const SelectTime = styled("div", {
  width: "90%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: "0.5rem",
});

export const Select = styled("select", {
  border: "none",
  outline: "none",
  background: "transparent",
  borderBottom: "1px solid rgba(0,0,0,0.5)",
});

export const Text = styled("pre", (props: { $txtColor: string }) => ({
  display: "inline-block",
  fontSize: "0.7rem",
  color: props.$txtColor,
}));

export const Input = styled("input", {
  border: "none",
  outline: "none",
  background: "transparent",
  borderBottom: "1px solid rgba(0,0,0,0.5)",
  width: "70%",
  height: "1.4rem",
  textAlign: "center",
});

export const DayButton = styled(
  "button",
  (props: { $selected: boolean; $selectedColor: string }) => ({
    border: "1px solid rgba(0,0,0,0.5)",
    backgroundColor: props.$selected ? props.$selectedColor : "#fff",
    borderRadius: "20px",
    padding: " 0.3rem 0.5rem",
  }),
);

export const SubmitBtn = styled("button", (props: { $btnColor: string }) => ({
  justifySelf: "end",
  alignSelf: "end",
  backgroundColor: props.$btnColor,
  color: "#fff",
  fontSize: "1.2rem",
  padding: "0 1.5rem",
  borderRadius: "20px",
}));
