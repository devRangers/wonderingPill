import { styled } from "styletron-react";

export const FilteringSearchContainer = styled(
  "div",
  (props: {
    $headerHeight: string;
    $footerHeight: string;
    $fullHeight: string;
  }) => ({
    display: "grid",
    gridTemplateRows: "1.3fr 0.7fr 1.3fr 1.3fr 1.3fr 0.7fr 0.7fr 1.2fr",
    gap: "0.5rem",
    minHeight: `calc(${props.$fullHeight} - (${props.$headerHeight} + ${props.$footerHeight}))`,
    maxWidth: "32rem",
    margin: "0 auto",
  }),
);

export const TitleContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "7rem",
});

export const TitleBox = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  maxWidth: "26rem",
  height: "60%",
  borderRadius: "1.5rem",
  backgroundColor: props.$bgColor,
  position: "relative",
}));

export const WarningContainer = styled("div", {
  position: "absolute",
  right: "0",
  bottom: "-1.3rem",
  widht: "5rem",
  height: "1rem",
  fontSize: "0.6rem",
  fontWeight: "bold",
});

export const WarningItem = styled("span", {
  marginLeft: "1rem",
  ":before": {
    content: "''",
    display: "inline-block",
    position: "relative",
    width: "5px",
    height: "5px",
    left: "-5px",
    borderRadius: "50%",
    backgroundColor: "red",
  },
});

export const Title = styled("div", {
  textAlign: "center",
  width: "65%",
  lineHeight: "1.2rem",
  color: "#fff",
  fontSize: "1.1rem",
  fontWeight: "bold",
});

export const BigContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BigBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});

export const BigTitle = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "7rem",
  fontWeight: "bold",
  backgroundColor: props.$bgColor,
  borderRadius: "1.5rem",
}));

export const BigDescriptionContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "110%",
    maxHeight: "7rem",
    left: "-10%",
    padding: "0.7rem 1rem 0.5rem 2rem",
    border: `2px solid ${props.$borderColor}`,
  }),
);

export const BigDescription = styled(
  "div",
  (props: { $scrollColor: string }) => ({
    height: "90%",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "0.9rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: props.$scrollColor,
      borderRadius: "20px",
    },
  }),
);

export const CompanyContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CompanyBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});

export const CompanyTitle = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "4rem",
  fontWeight: "bold",
  backgroundColor: props.$bgColor,
  borderRadius: "1.5rem",
}));

export const CompanyDescriptionContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "110%",
    maxHeight: "7rem",
    left: "-10%",
    padding: "0.7rem 1rem 0.5rem 2rem",
    border: `2px solid ${props.$borderColor}`,
  }),
);

export const SmallContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SmallBox = styled("div", {
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 1.7fr",
});

export const SmallTitle = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "5rem",
  fontWeight: "bold",
  backgroundColor: props.$bgColor,
  borderRadius: "1.5rem",
}));

export const SmallDescriptionContainer = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "110%",
    maxHeight: "5rem",
    left: "-10%",
    padding: "0.7rem 1rem 0.5rem 2rem",
    border: `2px solid ${props.$borderColor}`,
  }),
);

export const SmallDescription = styled(
  "div",
  (props: { $scrollColor: string }) => ({
    height: "90%",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "0.9rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: props.$scrollColor,
      borderRadius: "20px",
    },
  }),
);

export const Bottom = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BottomBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  width: "85%",
  maxWidth: "26rem",
  height: "100%",
});

export const RegisterButton = styled("div", (props: { $bgColor: string }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "40%",
  minHeight: "2.7rem",
  borderRadius: "1.5rem",
  backgroundColor: props.$bgColor,
  color: "#fff",
}));

export const ModalContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "80%",
});

export const CautionModalButton = styled(
  "div",
  (props: { $color: string }) => ({
    color: props.$color,
    fontSize: "0.8rem",
  }),
);
export const SearchOtherPill = styled("div", (props: { $color: string }) => ({
  color: props.$color,
  fontSize: "0.8rem",
}));

export const ModalInnerContainer = styled("section", {
  minHeight: "90vh",
  maxWidth: "30rem",
  display: "grid",
  gridTemplateRows: "0.11fr 0.42fr 0.42fr 0.05fr",
  gap: "0.5rem",
  padding: "1rem",
  margin: "0 auto",
});

export const ModalTopContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const ModalTitleWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.6",
});

export const ModalTitle = styled("h1", (props: { $color: string }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: props.$color,
}));

export const ModalSubTitleWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.4",
});

export const ModalSubTitle = styled("h5", {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "gray",
});

export const ModalContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ModalContentTitle = styled(
  "div",
  (props: { $bgColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "14%",
    borderRadius: "8px",
    backgroundColor: props.$bgColor,
    color: "#fff",
  }),
);

export const ModalContent = styled(
  "div",
  (props: { $borderColor: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    border: `1px solid ${props.$borderColor}`,
  }),
);

export const ModalContentScroll = styled(
  "div",
  (props: { $scrollColor: string }) => ({
    width: "100%",
    height: "90%",
    padding: "0 0.2rem 0 0.6rem",
    wordBreak: "break-word",
    overflowY: "auto",

    "::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: "0.9rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: props.$scrollColor,
      borderRadius: "20px",
    },
  }),
);

export const ModalBottom = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
});

export const CloseModalBtn = styled("button", {
  width: "100%",
  // height: "100%",
  color: "gray",
  fontSize: "1rem",
});
