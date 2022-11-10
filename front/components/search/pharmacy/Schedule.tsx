import { GREEN_COLOR } from "@utils/constant";
import { TimeContent } from "./PharmInfoModal.style";

interface ScheduleProps {
  schedules: { [key in string]: string };
}

const days = {
  monday: "월요일",
  tuesday: "화요일",
  wednesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
  sunday: "일요일",
  holiday: "공휴일",
};

const weekArr = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const todayIdx = (new Date().getDay() + 6) % 7;

function Schedule({ schedules }: ScheduleProps) {
  return (
    <>
      {Object.entries(days).map(([key, value]) => (
        <TimeContent
          key={key}
          $txtColor={GREEN_COLOR}
          $isToday={key === weekArr[todayIdx]}>
          {value} {schedules[key]}
        </TimeContent>
      ))}
    </>
  );
}

export default Schedule;
