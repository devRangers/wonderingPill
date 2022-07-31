import { styled } from "styletron-react";
export const BackGround = styled(
  "div",
  (props: { $openSideBar: boolean; $fullHeight: string }) => ({
    position: "fixed",
    width: "100vw",
    height: `calc(${props.$fullHeight})`,
    top: "0",
    left: "0",
    backgroundColor: "black",
    opacity: "0.4",
    visibility: props.$openSideBar ? "visible" : "hidden",
    zIndex: "2",
  }),
);

export const SidebarContainer = styled(
  "aside",
  (props: { $openSideBar: boolean; $fullHeight: string }) => ({
    position: "fixed",
    top: "0",
    left: "0",
    width: "70vw",
    height: `calc(${props.$fullHeight})`,
    zIndex: "3",

    transform: props.$openSideBar ? "translateX(0)" : "translateX(-71vw)",
    transition: "transform 0.3s",
  }),
);

export const SidebarHeader = styled(
  "div",
  (props: { $height: string; $bgColor: string }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0.3rem",
    height: props.$height,
    backgroundColor: props.$bgColor,
    fontSize: "2rem",
  }),
);

export const SidebarBody = styled(
  "div",
  (props: { $height: string; $fullHeight: string }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: `calc((${props.$fullHeight}) - ${props.$height})`,
    backgroundColor: "#fff",
    padding: "1.6rem 1rem",
  }),
);

export const BtnContainer = styled("div", {
  textAlign: "center",
});

export const SidebarBtn = styled("button", (props: { $bgColor: string }) => ({
  width: "90%",
  height: "2.8rem",
  fontSize: "1.3rem",

  color: "#fff",
  backgroundColor: props.$bgColor,

  borderRadius: "2rem",

  marginBottom: "0.7rem",
}));

export const LoginBtn = styled("button", (props: { $bgColor: string }) => ({
  width: "90%",
  height: "3.6rem",
  fontSize: "1.3rem",

  color: "#fff",
  backgroundColor: props.$bgColor,

  borderRadius: "2rem",

  marginBottom: "0.7rem",
}));
