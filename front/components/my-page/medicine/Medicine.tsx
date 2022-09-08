import { MAIN_COLOR } from "@utils/constant";
import { AlarmButton, MedicineBadge } from "./Medicine.style";

interface MedicineProp {
  name: string;
}

function Medicine({ name }: MedicineProp) {
  return (
    <MedicineBadge $borderColor={MAIN_COLOR}>
      <p>{name}</p>
      <AlarmButton $bgColor={MAIN_COLOR}>알림 수정하기</AlarmButton>
    </MedicineBadge>
  );
}

export default Medicine;
