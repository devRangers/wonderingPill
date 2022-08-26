import { userAtom } from "@atom/userAtom";
import { SUB_COLOR } from "@utils/constant";
import {
  Form,
  ItemContent,
  ItemInput,
  ItemName,
  ModifyButton,
  ModifyItem,
} from "./ModifyPage.style";
import ReactTooltip from "react-tooltip";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { patch } from "@api";
import { UpdateUserDto } from "@modelTypes/updateUserDto";
import SubmitResult from "./modals/SubmitResult";
import { useState } from "react";

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
  title: string;
  contents: string[];
}

const modalData: { [key in string]: modalValues } = {
  success: {
    title: "",
    contents: ["개인정보가 변경되었습니다."],
  },
  fail: {
    title: "",
    contents: ["개인정보 변경에 실패했습니다."],
  },
};

function ModifyForm() {
  const [user] = useAtom(userAtom);
  const [isOpenModal, setIsOpenModal] = useState({
    success: false,
    fail: false,
  });

  if (user.name) {
    initialModifyValue.name = user.name;
  }

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
          name: data.name.length == 0 ? undefined : data.name,
          password: data.curPassword.length == 0 ? undefined : data.curPassword,
          newPassword:
            data.newPassword.length == 0 ? undefined : data.newPassword,
        },
      ),
    {
      onSuccess: (data) => {
        handleSuccessModal();
        console.log(data);
      },
      onError: (err) => {
        handleFailModal();
        console.log(err);
      },
    },
  );

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
      if (values.newPassword !== values.checkPassword) {
        console.log("돌아가!");
        return;
      }
      mutation.mutate(values);
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
      {isOpenModal.success && (
        <SubmitResult
          title=""
          contents={modalData.success.contents}
          isOpenModal={isOpenModal.success}
          handleCloseSubmitResult={handleSuccessModal}
        />
      )}
      {isOpenModal.fail && (
        <SubmitResult
          title=""
          contents={modalData.fail.contents}
          isOpenModal={isOpenModal.fail}
          handleCloseSubmitResult={handleFailModal}
        />
      )}
    </>
  );
}

export default ModifyForm;
