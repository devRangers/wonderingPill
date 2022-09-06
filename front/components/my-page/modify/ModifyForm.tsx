import { useState } from "react";
import { patch } from "@api";
import { userAtom } from "@atom/userAtom";
import { ERROR_MSG_COLOR, SUB_COLOR } from "@utils/constant";
import { UpdateUserDto } from "@modelTypes/updateUserDto";
import {
  ErrorMesasge,
  Form,
  ItemContent,
  ItemInput,
  ItemName,
  ItemWrapper,
  ModifyButton,
  ModifyItem,
} from "./ModifyPage.style";
import * as Yup from "yup";
import { useAtom } from "jotai";
import { useFormik } from "formik";
import Modify from "./modals/Modify";
import ReactTooltip from "react-tooltip";
import { useMutation } from "react-query";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillExclamationCircleFill } from "react-icons/bs";

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

interface modalValues {
  content: string;
}

const modalData: { [key in string]: modalValues } = {
  success: {
    content: "회원정보가 변경되었습니다.",
  },
  fail: {
    content: "회원정보 변경에 실패했습니다.",
  },
};

function ModifyForm() {
  const [user] = useAtom(userAtom);
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [isOpenModal, setIsOpenModal] = useState({
    success: false,
    fail: false,
  });

  const handleSuccessModal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        success: !cur.success,
      };
    });
  };
  const handleFailModal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        fail: !cur.fail,
      };
    });
  };

  const mutation = useMutation(
    (data: ModifyValues) =>
      patch<{ statusCode: number; message: string }, UpdateUserDto>(
        "/users/update-user",
        {
          name: data.name || undefined,
          password: data.curPassword || undefined,
          newPassword: data.newPassword || undefined,
        },
      ),
    {
      onSuccess: (data) => {
        handleSuccessModal();
        modifyDataFormik.resetForm();
      },
      onError: (err: any) => {
        handleFailModal();
      },
    },
  );

  const modifyDataFormik = useFormik({
    initialValues: initialModifyValue,
    validationSchema: Yup.object({
      name: Yup.string().max(20, "20자 이하로 입력 해 주세요."),
      curPassword: Yup.string()
        .max(20, "20자 이하로 입력 해 주세요.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "소문자, 숫자, 특수문자 포함 8자 이상입니다.",
        ),
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
    onSubmit: async (values, {}) => {
      if (values.newPassword !== values.checkPassword) {
        handleFailModal();
        return;
      }
      if (!values.name && !values.curPassword && !values.newPassword) {
        handleFailModal();
        return;
      }
      mutation.mutate(values);
      setNamePlaceholder(values.name);
    },
  });
  return (
    <>
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
            placeholder={namePlaceholder ? namePlaceholder : user.name}
          />
        </ModifyItem>
        <ModifyItem>
          <ItemName>비밀번호</ItemName>
          <ItemWrapper>
            <ItemInput
              id="curPassword"
              type="password"
              autoComplete="true"
              {...modifyDataFormik.getFieldProps("curPassword")}
              placeholder="현재 비밀번호를 입력하세요."
              data-tip="curPassword-tooltip"
              data-for="curPassword-tooltip"
            />
            {modifyDataFormik.touched.curPassword &&
            modifyDataFormik.errors.curPassword ? (
              <ReactTooltip
                key="curPassword-tooltip"
                id="curPassword-tooltip"
                place="top">
                {modifyDataFormik.errors.curPassword}
              </ReactTooltip>
            ) : (
              <></>
            )}
          </ItemWrapper>
        </ModifyItem>
        <ModifyItem>
          <ItemName>새 비밀번호</ItemName>
          <ItemWrapper>
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
              <>
                <ReactTooltip
                  key="newPassword-tooltip"
                  id="newPassword-tooltip"
                  place="top">
                  {modifyDataFormik.errors.newPassword}
                </ReactTooltip>
                <ErrorMesasge $color={ERROR_MSG_COLOR}>
                  새 비밀번호를 확인하세요.
                </ErrorMesasge>
              </>
            ) : (
              <></>
            )}
          </ItemWrapper>
        </ModifyItem>
        <ModifyItem>
          <ItemName>비밀번호 확인</ItemName>
          <ItemWrapper>
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
              <>
                <ReactTooltip
                  key="checkPassword-tooltip"
                  id="checkPassword-tooltip"
                  place="top">
                  {modifyDataFormik.errors.checkPassword}
                </ReactTooltip>
                <ErrorMesasge $color={ERROR_MSG_COLOR}>
                  비밀번호가 일치하지 않습니다.
                </ErrorMesasge>
              </>
            ) : (
              <></>
            )}
          </ItemWrapper>
        </ModifyItem>
        <ModifyButton type="submit" $buttonColor={SUB_COLOR}>
          변경
        </ModifyButton>
      </Form>
      {isOpenModal.success && (
        <Modify
          content={modalData.success.content}
          isOpenModal={isOpenModal.success}
          handleCloseModifyResult={handleSuccessModal}>
          <AiOutlineCheckCircle />
        </Modify>
      )}
      {isOpenModal.fail && (
        <Modify
          content={modalData.fail.content}
          isOpenModal={isOpenModal.fail}
          handleCloseModifyResult={handleFailModal}>
          <BsFillExclamationCircleFill color="red" />
        </Modify>
      )}
    </>
  );
}

export default ModifyForm;
