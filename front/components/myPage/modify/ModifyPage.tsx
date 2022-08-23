import React from "react";
import { userAtom } from "@atom/userAtom";
import { SUB_COLOR } from "@utils/constant";
import {
  BorderLine,
  BottomContainer,
  CustomerButton,
  CustomerContainer,
  CustomerContainerLeftSide,
  CustomerContainerRightSide,
  Form,
  ItemContent,
  ItemInput,
  ItemName,
  LeftSideContent,
  LeftSideTitle,
  ModifyButton,
  ModifyContainer,
  ModifyItem,
} from "./ModifyPage.style";
import Template from "../Template";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import * as Yup from "yup";
import ReactTooltip from "react-tooltip";

interface ModifyValues {
  name: string;
  curPassword: string;
  newPassword: string;
  checkPassword: string;
}

const initialModifyValue: ModifyValues = {
  name: "",
  curPassword: "",
  newPassword: "",
  checkPassword: "",
};

function ModifyPage() {
  const [user] = useAtom(userAtom);

  if (user.name) {
    initialModifyValue.name = user.name;
  }

  const modifyDataFormik = useFormik({
    initialValues: initialModifyValue,
    validationSchema: Yup.object({
      name: Yup.string().max(20, "20자 이하로 입력 해 주세요."),
      curPassword: Yup.string().max(20, "20자 이하로 입력 해 주세요."),
      newPassword: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
      checkPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "비밀번호가 일치하지 않습니다.")
        .max(20, "20자 이하로 입력 해 주세요."),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // mutation.mutate(newSubmitData);
    },
  });

  return (
    <Template gridTemplateRows="0.3fr 1fr 0.7fr">
      <ModifyContainer>
        <BorderLine $borderColor={SUB_COLOR} />
        <Form onSubmit={modifyDataFormik.handleSubmit}>
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
              id="name"
              type="text"
              {...modifyDataFormik.getFieldProps("name")}
              placeholder="이름을 입력해주세요."
            />
          </ModifyItem>
          <ModifyItem>
            <ItemName>비밀번호</ItemName>
            <ItemInput
              id="curPassword"
              type="password"
              autoComplete="true"
              {...modifyDataFormik.getFieldProps("curPassword")}
              placeholder="현재 비밀번호를 입력하세요."
            />
          </ModifyItem>
          <ModifyItem>
            <ItemName>새 비밀번호</ItemName>
            <ItemInput
              id="newPassword"
              type="password"
              autoComplete="true"
              {...modifyDataFormik.getFieldProps("newPassword")}
              placeholder="새로운 비밀번호를 입력하세요."
              data-tip="newPassword-tooltip"
              data-for="newPassword-tooltip"
            />
            {modifyDataFormik.touched.newPassword &&
            modifyDataFormik.errors.newPassword ? (
              <ReactTooltip
                key="newPassword-tooltip"
                id="newPassword-tooltip"
                place="top">
                {modifyDataFormik.errors.newPassword}
              </ReactTooltip>
            ) : (
              <></>
            )}
          </ModifyItem>
          <ModifyItem>
            <ItemName>비밀번호 확인</ItemName>
            <ItemInput
              id="checkPassword"
              type="password"
              autoComplete="true"
              {...modifyDataFormik.getFieldProps("checkPassword")}
              placeholder="다시 한번 비밀번호를 입력하세요."
              data-tip="checkPassword-tooltip"
              data-for="checkPassword-tooltip"
            />
            {modifyDataFormik.touched.checkPassword &&
            modifyDataFormik.errors.checkPassword ? (
              <ReactTooltip
                key="checkPassword-tooltip"
                id="checkPassword-tooltip"
                place="top">
                {modifyDataFormik.errors.checkPassword}
              </ReactTooltip>
            ) : (
              <></>
            )}
          </ModifyItem>
          <ModifyButton type="submit" $buttonColor={SUB_COLOR}>
            변경
          </ModifyButton>
        </Form>
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
