import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { SEMI_ACCENT_COLOR, GRAY_COLOR, SUB_COLOR } from "@utils/constant";
import { SetAlarmDto as SetAlarmValues } from "@modelTypes/setAlarmDto";
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

export type SettingFormValues = Pick<
  SetAlarmValues,
  "hour" | "minute" | "repeatTime"
>;

interface TimeFormProps {
  disabled: boolean;
  isAfternoon: boolean;
  values: SettingFormValues;
  vip: number[];
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
  values,
  vip,
  onChange,
  setVip,
  setIsAfternoon,
}: TimeFormProps) {
  const [selectedDays, setSelectedDays] = useState(
    Array.from({ length: 7 }, (_, idx) => (vip.includes(idx) ? true : false)),
  );
  const [selectedDaysText, setSelectedDaysText] = useState("");

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "오후") setIsAfternoon(true);
    else setIsAfternoon(false);
  };

  useEffect(() => {
    const selectedIdx = selectedDays.reduce(
      (a: number[], e, i) => (e === true ? a.concat(i) : a),
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
            <Select
              disabled={disabled}
              onChange={selectChangeHandler}
              defaultValue={values.hour < 12 ? "오전" : "오후"}>
              <option value="오전">오전</option>
              <option value="오후">오후</option>
            </Select>
            <div>
              <Input
                type="number"
                name="hour"
                value={values.hour > 12 ? values.hour - 12 : values.hour}
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
                value={values.minute}
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
