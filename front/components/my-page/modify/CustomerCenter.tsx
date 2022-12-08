import React, { useCallback, useState } from "react";
import {
  BorderLine,
  CustomerButton,
  CustomerContainer,
  CustomerContainerLeftSide,
  CustomerContainerRightSide,
  LeftSideContent,
  LeftSideTitle,
} from "./ModifyPage.style";
import CustomerCenterModal from "./modals/CustomerCenter";
import SubmitResultModal from "./modals/SubmitResult";
import { SubmitModals } from "./ModifyPage";
import { SUB_COLOR } from "@utils/constant";

const submitModalData: { [key in string]: SubmitModals } = {
  customerCenter: {
    title: "고객 문의 완료",
    contents: [
      "문의가 완료되었습니다.",
      "답변은 등록된 이메일을 통해 받아보실 수 있습니다.",
    ],
  },
};

const CustomerCenter = () => {
  const [isOpenModal, setIsOpenModal] = useState({
    customerCenter: false,
    successInquiry: false,
  });

  const handleClickCustomerCenter = useCallback(() => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        customerCenter: !cur.customerCenter,
      };
    });
  }, []);

  const handleClickSuccessInquiry = useCallback(() => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        successInquiry: !cur.successInquiry,
      };
    });
  }, []);

  return (
    <>
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
      {isOpenModal && (
        <CustomerCenterModal
          isOpenModal={isOpenModal.customerCenter}
          handleCloseCustomerCenter={handleClickCustomerCenter}
          handleOpenSuccessInquiry={handleClickSuccessInquiry}
        />
      )}
      {isOpenModal.successInquiry && (
        <SubmitResultModal
          {...submitModalData.customerCenter}
          isOpenModal={isOpenModal.successInquiry}
          handleCloseSubmitResult={handleClickSuccessInquiry}
        />
      )}
    </>
  );
};

export default CustomerCenter;
