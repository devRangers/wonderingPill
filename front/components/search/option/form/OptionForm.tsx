import React, { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { MESSAGE, Toastify } from "@utils/toastify";
import { MAIN_COLOR, ROUTE, SEMI_ACCENT_COLOR } from "@utils/constant";
import {
  Button,
  Form,
  Input,
  InputWrapper,
  Label,
} from "@searchOptionComp/Option.style";
import * as Yup from "yup";
import { useFormik } from "formik";

interface InputValues {
  word: string;
  pillName: string;
}

const inputInitialValue: InputValues = {
  word: "",
  pillName: "",
};

interface OptionFormProps {
  shape: string[];
  colors: string[];
  mark: string;
  letters: string;
}

function OptionForm({ shape, colors, mark, letters }: OptionFormProps) {
  const router = useRouter();

  const selectErrorMessage = useCallback(() => {
    if (shape.length === 0) {
      Toastify.fail(MESSAGE.OPTION_SHAPE_FAIL);
      return false;
    } else if (colors.length === 0) {
      Toastify.fail(MESSAGE.OPTION_COLOR_FAIL);
      return false;
    }
    return true;
  }, [shape, colors]);

  const routerToResultList = (values: InputValues) => {
    router.push({
      pathname: ROUTE.SEARCH_RESULT_LIST,
      query: {
        colors: colors.join(""),
        shape: shape.join(""),
        mark,
        letters: values.word,
        name: values.pillName,
      },
    });
  };

  const searchPillFormik = useFormik({
    initialValues: {
      ...inputInitialValue,
      word: letters,
    },
    validationSchema: Yup.object({
      word: Yup.string().max(10, "10자 이하로 입력 해 주세요."),
      pillName: Yup.string().max(20, "20자 이하로 입력 해 주세요."),
    }),
    onSubmit: async (values) => {
      if (!selectErrorMessage()) return;
      routerToResultList(values);
    },
  });

  return (
    <>
      <Form onSubmit={searchPillFormik.handleSubmit}>
        <InputWrapper $color={SEMI_ACCENT_COLOR}>
          <Label htmlFor="word">글자</Label>
          <Input
            id="word"
            type="text"
            {...searchPillFormik.getFieldProps("word")}
            placeholder="약에 쓰여있는 글자"
            $borderColor={SEMI_ACCENT_COLOR}
          />
        </InputWrapper>
        <InputWrapper $color={SEMI_ACCENT_COLOR}>
          <Label htmlFor="pillName">약 이름</Label>
          <Input
            id="pillName"
            type="text"
            {...searchPillFormik.getFieldProps("pillName")}
            placeholder="약의 이름"
            $borderColor={SEMI_ACCENT_COLOR}
          />
        </InputWrapper>
        <Button type="submit" $bgColor={MAIN_COLOR}>
          검색하기
        </Button>
      </Form>
    </>
  );
}

export default memo(OptionForm);
