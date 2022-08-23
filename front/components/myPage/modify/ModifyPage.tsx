import React from "react";
import { SUB_COLOR } from "@utils/constant";
import {
  BorderLine,
  BottomContainer,
  CustomerButton,
  CustomerContainer,
  CustomerContainerLeftSide,
  CustomerContainerRightSide,
  LeftSideContent,
  LeftSideTitle,
  ModifyContainer,
} from "./ModifyPage.style";
import Template from "../Template";
import ModifyForm from "./ModifyForm";

function ModifyPage() {
  return (
    <Template gridTemplateRows="0.3fr 1fr 0.7fr">
      <ModifyContainer>
        <BorderLine $borderColor={SUB_COLOR} />
        <ModifyForm />
      </ModifyContainer>
      <BottomContainer>
        <CustomerContainer>
          <BorderLine $borderColor={SUB_COLOR} />
          <CustomerContainerLeftSide>
            <LeftSideTitle>고객 센터</LeftSideTitle>
            <LeftSideContent>
              무엇을 도와드릴까요?
              <br /> 개발팀에게 1:1문의를 보내보세요.
            </LeftSideContent>
          </CustomerContainerLeftSide>
          <CustomerContainerRightSide>
            <CustomerButton $buttonColor={SUB_COLOR}>문의 하기</CustomerButton>
          </CustomerContainerRightSide>
        </CustomerContainer>
        <CustomerContainer>
          <BorderLine $borderColor={SUB_COLOR} />
          <CustomerContainerLeftSide>
            <LeftSideTitle>회원 탈퇴</LeftSideTitle>
            <LeftSideContent>
              회원 탈퇴를 신청하기전에
              <br /> 안내 사항을 꼭 확인해주세요.
            </LeftSideContent>
          </CustomerContainerLeftSide>
          <CustomerContainerRightSide>
            <CustomerButton $buttonColor={SUB_COLOR}>회원 탈퇴</CustomerButton>
          </CustomerContainerRightSide>
        </CustomerContainer>
      </BottomContainer>
    </Template>
  );
}

export default ModifyPage;
