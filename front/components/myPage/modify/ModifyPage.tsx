import React from "react";
import Template from "../Template";
import {
  BottomContainer,
  CustomerContainer,
  ModifyContainer,
} from "./ModifyPage.style";

function ModifyPage() {
  return (
    <Template gridTemplateRows="1fr 1fr 1fr">
      <ModifyContainer>개인정보수정 컨테이너</ModifyContainer>
      <BottomContainer>
        <CustomerContainer>고객 센터</CustomerContainer>
        <CustomerContainer>회원 탈퇴</CustomerContainer>
      </BottomContainer>
    </Template>
  );
}

export default ModifyPage;
