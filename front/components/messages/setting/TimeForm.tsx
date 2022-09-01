import { useState, useEffect, Dispatch, SetStateAction } from "react";
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
  Select,
  Input,
  Text,
} from "./SetNotificationPage.style";

interface TimeFormProps {
  disabled: boolean;
  isAfternoon: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  setVip: Dispatch<SetStateAction<number[]>>;
  setIsAfternoon: Dispatch<SetStateAction<boolean>>;
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

function TimeForm({
  disabled,
  isAfternoon,
  onChange,
  setVip,
  setIsAfternoon,
}: TimeFormProps) {
  const [selectedDays, setSelectedDays] = useState(Array(7).fill(false));
  const [selectedDaysText, setSelectedDaysText] = useState("");

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "오후") setIsAfternoon(true);
    else setIsAfternoon(false);
  };

  useEffect(() => {
    const selectedIdx = selectedDays.reduce(
      (a, e, i) => (e === true ? a.concat(i) : a),
      [],
    );
    setVip(selectedIdx);
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
          <SelectTime>
            <Select disabled={disabled} onChange={selectChangeHandler}>
              <option value="오전">오전</option>
              <option value="오후">오후</option>
            </Select>
            <div>
              <Input
                type="number"
                name="hour"
                min={isAfternoon ? "1" : "0"}
                max={isAfternoon ? "12" : "11"}
                disabled={disabled}
                onChange={onChange}
                $width="70%"
              />{" "}
              <Text $txtColor={disabled ? GRAY_COLOR : "#000"}>시</Text>
            </div>
            <div>
              <Input
                type="number"
                name="minute"
                min="0"
                max="59"
                disabled={disabled}
                onChange={onChange}
                $width="70%"
              />{" "}
              <Text $txtColor={disabled ? GRAY_COLOR : "#000"}>분</Text>
            </div>
          </SelectTime>
        </TimeSelectContainer>
      </Form>
    </FormContainer>
  );
}

export default TimeForm;
