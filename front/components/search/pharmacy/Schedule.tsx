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

function Schedule({ schedules }: ScheduleProps) {
  return (
    <>
      {Object.entries(days).map(([key, value]) => (
        <p>
          {value} {schedules[key]}
        </p>
      ))}
    </>
  );
}

export default Schedule;
