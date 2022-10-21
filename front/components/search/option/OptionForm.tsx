import React, { useState } from "react";
import { MAIN_COLOR, SEMI_ACCENT_COLOR } from "@utils/constant";
import { Button, Form, Input, InputWrapper, Label } from "./Option.style";

interface InputValues {
  word: string;
  pillName: string;
}

function OptionForm() {
  const [inputsValue, setInputsValue] = useState<InputValues>({
    word: "",
    pillName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputsValue((cur) => {
      return {
        ...cur,
        [name]: value,
      };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper $color={SEMI_ACCENT_COLOR}>
        <Label htmlFor="word">글자</Label>
        <Input
          type="text"
          name="word"
          id="word"
          onChange={handleChangeInputValue}
          $borderColor={SEMI_ACCENT_COLOR}
        />
      </InputWrapper>
      <InputWrapper $color={SEMI_ACCENT_COLOR}>
        <Label htmlFor="pillName">약 이름</Label>
        <Input
          type="text"
          name="pillName"
          id="pillName"
          onChange={handleChangeInputValue}
          $borderColor={SEMI_ACCENT_COLOR}
        />
      </InputWrapper>
      <Button type="submit" $bgColor={MAIN_COLOR}>
        검색하기
      </Button>
    </Form>
  );
}

export default OptionForm;
