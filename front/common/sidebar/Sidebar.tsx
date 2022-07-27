import { MAIN_COLOR, SIDE_BAR_HEADER_HEIGHT, SUB_COLOR } from "@utils/constant";
import React from "react";
import {
  BackGround,
  SidebarBody,
  SidebarContainer,
  SidebarHeader,
} from "./Sidebar.style";
import { BsArrowLeftShort } from "react-icons/bs";

interface SidebarProp {
  openSideBar: boolean;
  closeSideBar: () => void;
}

function Sidebar({ openSideBar, closeSideBar }: SidebarProp) {
  return (
    <>
      <BackGround $openSideBar={openSideBar} />
      <SidebarContainer $openSideBar={openSideBar}>
        <SidebarHeader $height={SIDE_BAR_HEADER_HEIGHT} $bgColor={MAIN_COLOR}>
          <BsArrowLeftShort color={SUB_COLOR} onClick={() => closeSideBar()} />
        </SidebarHeader>
        <SidebarBody $height={SIDE_BAR_HEADER_HEIGHT} />
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
