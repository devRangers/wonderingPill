import { styled } from "styletron-react";
export const BackGround = styled("div", (props: { $openSideBar: boolean }) => ({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  backgroundColor: "black",
  opacity: "0.4",
  visibility: props.$openSideBar ? "visible" : "hidden",
  zIndex: "2",
}));

export const SidebarContainer = styled(
  "aside",
  (props: { $openSideBar: boolean }) => ({
    position: "fixed",
    top: "0",
    left: "0",
    width: "70vw",
    height: "100vh",
    zIndex: "3",

    transform: props.$openSideBar ? "translateX(0)" : "translateX(-71vw)",
    transition: "transform 1s",
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

export const SidebarBody = styled("div", (props: { $height: string }) => ({
  height: `calc(100vh - ${props.$height})`,
  backgroundColor: "#fff",
}));
