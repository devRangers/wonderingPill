import { userAtom } from "@atom/userAtom";
import { SUB_COLOR } from "@utils/constant";
import { useAtom } from "jotai";
import React from "react";
import Template from "../Template";
import {
  BorderLine,
  BottomContainer,
  CustomerButton,
  CustomerContainer,
  CustomerContainerLeftSide,
  CustomerContainerRightSide,
  ItemContent,
  ItemInput,
  ItemName,
  LeftSideContent,
  LeftSideTitle,
  ModifyButton,
  ModifyContainer,
  ModifyItem,
} from "./ModifyPage.style";

function ModifyPage() {
  const [user] = useAtom(userAtom);

  return (
    <Template gridTemplateRows="0.3fr 1fr 0.7fr">
      <ModifyContainer>
        <BorderLine $borderColor={SUB_COLOR} />
        <ModifyItem>
          <ItemName>이메일</ItemName>
          <ItemContent>{user.email}</ItemContent>
        </ModifyItem>
        <ModifyItem>
          <ItemName>전화번호</ItemName>
          <ItemContent>01000000000</ItemContent>
        </ModifyItem>
        <ModifyItem>
          <ItemName>이름</ItemName>
          <ItemInput
            placeholder="이름을 입력해주세요."
            value={user.name}></ItemInput>
        </ModifyItem>
        <ModifyItem>
          <ItemName>비밀번호</ItemName>
          <ItemInput
            placeholder="현재 비밀번호를 입력하세요."
            value={user.name}></ItemInput>
        </ModifyItem>
        <ModifyItem>
          <ItemName />
          <ItemInput
            placeholder="새로운 비밀번호를 입력하세요."
            value={user.name}></ItemInput>
        </ModifyItem>
        <ModifyItem>
          <ItemName />
          <ItemInput
            placeholder="다시 한번 비밀번호를 입력하세요."
            value={user.name}></ItemInput>
        </ModifyItem>
        <ModifyButton $buttonColor={SUB_COLOR}>변경</ModifyButton>
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
