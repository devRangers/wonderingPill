import React from "react";
import {
  BorderLine,
  BottomContainer,
  ModifyContainer,
} from "./ModifyPage.style";
import { SUB_COLOR } from "@utils/constant";
import Template from "../Template";
import ModifyForm from "./ModifyForm";
import CustomerCenter from "./CustomerCenter";
import WithDrawl from "./WithDrawl";

export interface SubmitModals {
  title: string;
  contents: string[];
}

function ModifyPage() {
  return (
    <Template gridTemplateRows="0.3fr 1fr 0.7fr">
      <ModifyContainer>
        <BorderLine $borderColor={SUB_COLOR} />
        <ModifyForm />
      </ModifyContainer>
      <BottomContainer>
        <CustomerCenter />
        <WithDrawl />
      </BottomContainer>
    </Template>
  );
}

export default ModifyPage;
