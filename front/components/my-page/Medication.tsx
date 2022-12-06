import React from "react";
import {
  ContentClip,
  ContentContainer,
  MedicineBadgeContainer,
} from "./MyPage.style";
import { LIGHT_GRAY_COLOR, SUB_COLOR } from "@utils/constant";
import Medicine from "./medicine/Medicine";

const medicinesName: { [key in string]: string } = {
  name1: "가스모틴정",
  name2: "가스모틴정_2",
  name3: "가스모틴정_3",
  name4: "가스모틴정_4",
  name5: "가스모틴정_5",
};

const Medication = () => {
  return (
    <ContentContainer $borderColor={SUB_COLOR} $bgColor={LIGHT_GRAY_COLOR}>
      <ContentClip $bgColor={SUB_COLOR}>복용약</ContentClip>
      <MedicineBadgeContainer>
        {Object.entries(medicinesName).map(([key, value]) => (
          <Medicine key={key} name={value} />
        ))}
      </MedicineBadgeContainer>
    </ContentContainer>
  );
};

export default Medication;
