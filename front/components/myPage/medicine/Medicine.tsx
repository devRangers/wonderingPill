import { BUTTON_COLOR as BORDER_COLOR, MAIN_COLOR } from "@utils/constant";
import { AlarmButton, MedicineBadge } from "./Medicine.style";

interface MedicineProp {
  name: string;
}

function Medicine({ name }: MedicineProp) {
  return (
    <MedicineBadge $borderColor={BORDER_COLOR}>
      <p>{name}</p>
      <AlarmButton $bgColor={MAIN_COLOR}>알림 수정하기</AlarmButton>
    </MedicineBadge>
  );
}

export default Medicine;
