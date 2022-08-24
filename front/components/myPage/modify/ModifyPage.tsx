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
import SubmitResult from "./modals/SubmitResult";

interface SubmitModals {
  title: string;
  contents: string[];
}

const submitModalData: { [key in string]: SubmitModals } = {
  customerCenter: {
    title: "고객 문의 완료",
    contents: [
      "문의가 완료되었습니다.",
      "답변은 등록된 이메일을 통해 받아보실 수 있습니다.",
    ],
  },
  withdrawal: {
    title: "회원 탈퇴 완료",
    contents: [
      "회원 탈퇴가 완료되었습니다.",
      "보다 나은 궁금해 약으로 다시 뵐 수 있기를 기대합니다",
    ],
  },
};

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
        customerCenter: !cur.customerCenter,
      };
    });
  };

  const handleClickWithdrawal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        withdrawal: !cur.withdrawal,
      };
    });
  };

  const handleClickSuccessInquiry = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        successInquiry: !cur.successInquiry,
      };
    });
  };
  const handleClickSuccessWithdrawal = () => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        successWithdrawal: !cur.successWithdrawal,
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
          handleCloseCustomerCenter={handleClickCustomerCenter}
          handleOpenSuccessInquiry={handleClickSuccessInquiry}
        />
      )}
      {isOpenModal.successInquiry && (
        <SubmitResult
          {...submitModalData.customerCenter}
          isOpenModal={isOpenModal.successInquiry}
          handleCloseSubmitResult={handleClickSuccessInquiry}
        />
      )}

      {isOpenModal.withdrawal && (
        <WithDrawl
          {...submitModalData.customerCenter}
          isOpenModal={isOpenModal.withdrawal}
          handleCloseWithDrawl={handleClickWithdrawal}
          handleOpenSuccessWithDrawl={handleClickSuccessWithdrawal}
        />
      )}

      {isOpenModal.successWithdrawal && (
        <SubmitResult
          {...submitModalData.withdrawal}
          isOpenModal={isOpenModal.successWithdrawal}
          handleCloseSubmitResult={handleClickSuccessWithdrawal}
        />
      )}
    </>
  );
}

export default ModifyPage;
