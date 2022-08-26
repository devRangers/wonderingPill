import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SEMI_ACCENT_COLOR, GRAY_COLOR, SUB_COLOR } from "@utils/constant";
import {
  FormContainer,
  FormTitle,
  Form,
  TimeSelectContainer,
  SelectedDays,
  BtnContainer,
  DayButton,
  SelectTime,
} from "./SetNotificationPage.style";

interface TimeFormProps {
  disabled: boolean;
}

const Day = {
  SUN: "일",
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
};

function TimeForm({ disabled }: TimeFormProps) {
  const [selectedDays, setSelectedDays] = useState(Array(7).fill(false));
  const [selectedDaysText, setSelectedDaysText] = useState("");

  useEffect(() => {
    const selectedIdx = selectedDays.reduce(
      (a, e, i) => (e === true ? a.concat(i) : a),
      [],
    );
    const text = Object.values(Day).reduce(
      (a, e, i) => (selectedIdx.includes(i) ? (a += e + ", ") : a),
      "",
    );
    setSelectedDaysText(text);
  }, [selectedDays]);

  return (
    <FormContainer>
      <FormTitle $txtColor={disabled ? GRAY_COLOR : SEMI_ACCENT_COLOR}>
        시간 설정
      </FormTitle>
      <Form $height="90%">
        <TimeSelectContainer>
          <SelectedDays>
            {!!selectedDaysText ? "매주 " + selectedDaysText : " "}
          </SelectedDays>
          <BtnContainer>
            {Object.entries(Day).map(([key, value], idx) => (
              <DayButton
                key={key}
                type="button"
                disabled={disabled}
                onClick={() =>
                  setSelectedDays((cur) => {
                    const temp = [...cur];
                    temp[idx] = !temp[idx];
                    return temp;
                  })
                }
                $selected={selectedDays[idx]}
                $selectedColor={SUB_COLOR}>
                {value}
              </DayButton>
            ))}
          </BtnContainer>
          <SelectTime></SelectTime>
        </TimeSelectContainer>
      </Form>
    </FormContainer>
  );
}

export default TimeForm;
