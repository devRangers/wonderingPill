import React, { useState } from "react";
import { SUB_COLOR } from "@utils/constant";
import {
  BorderLine,
  BottomContainer,
  CustomerButton,
  CustomerContainer,
  CustomerContainerLeftSide,
  CustomerContainerRightSide,
  LeftSideContent,
  LeftSideTitle,
  ModifyContainer,
} from "./ModifyPage.style";
import Template from "../Template";
import ModifyForm from "./ModifyForm";
import CustomerCenter from "./modals/CustomerCenter";
import SuccessInquiry from "./modals/SuccessInquiry";
import WithDrawl from "./modals/WithDrawl";

function ModifyPage() {
  const [isOpenModal, setIsOpenModal] = useState({
    customerCenter: false,
    successInquiry: false,
    withdrawal: false,
    successWithdrawal: false,
  });

  const handleClickCustomerCenter = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        customerCenter: true,
      };
    });
  };

  const handleClickWithdrawal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        withdrawal: true,
      };
    });
  };

  const handleCloseCustomerCenter = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        customerCenter: false,
      };
    });
  };

  const handleCloseSuccessInquiry = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        successInquiryModal: false,
      };
    });
  };

  const handleCloseWithdrawal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        withdrawal: false,
      };
    });
  };
  return (
    <>
      <Template gridTemplateRows="0.3fr 1fr 0.7fr">
        <ModifyContainer>
          <BorderLine $borderColor={SUB_COLOR} />
          <ModifyForm />
        </ModifyContainer>
        <BottomContainer>
          <CustomerContainer>
            <BorderLine $borderColor={SUB_COLOR} />
            <CustomerContainerLeftSide>
              <LeftSideTitle>고객 센터</LeftSideTitle>
              <LeftSideContent>
                무엇을 도와드릴까요?
                <br /> 개발팀에게 1:1문의를 보내보세요.
              </LeftSideContent>
            </CustomerContainerLeftSide>
            <CustomerContainerRightSide>
              <CustomerButton
                $buttonColor={SUB_COLOR}
                onClick={handleClickCustomerCenter}>
                문의 하기
              </CustomerButton>
            </CustomerContainerRightSide>
          </CustomerContainer>
          <CustomerContainer>
            <BorderLine $borderColor={SUB_COLOR} />
            <CustomerContainerLeftSide>
              <LeftSideTitle>회원 탈퇴</LeftSideTitle>
              <LeftSideContent>
                회원 탈퇴를 신청하기전에
                <br /> 안내 사항을 꼭 확인해주세요.
              </LeftSideContent>
            </CustomerContainerLeftSide>
            <CustomerContainerRightSide>
              <CustomerButton
                $buttonColor={SUB_COLOR}
                onClick={handleClickWithdrawal}>
                회원 탈퇴
              </CustomerButton>
            </CustomerContainerRightSide>
          </CustomerContainer>
        </BottomContainer>
      </Template>
      {isOpenModal.customerCenter && (
        <CustomerCenter
          isOpenModal={isOpenModal.customerCenter}
          handleCloseCustomerCenter={handleCloseCustomerCenter}
        />
      )}
      {isOpenModal.successInquiry && (
        <SuccessInquiry
          isOpenModal={isOpenModal.successInquiry}
          handleCloseSuccessInquiry={handleCloseSuccessInquiry}
        />
      )}
      {isOpenModal.withdrawal && (
        <WithDrawl
          isOpenModal={isOpenModal.withdrawal}
          handleCloseWithDrawl={handleCloseWithdrawal}></WithDrawl>
      )}
    </>
  );
}

export default ModifyPage;
