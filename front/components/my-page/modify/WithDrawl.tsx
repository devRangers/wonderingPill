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
import WithDrawalModal from "./modals/WithDrawal";
import SubmitResultModal from "./modals/SubmitResult";
import { SUB_COLOR } from "@utils/constant";
import { SubmitModals } from "./ModifyPage";

const submitModalData: { [key in string]: SubmitModals } = {
  withdrawal: {
    title: "회원 탈퇴 완료",
    contents: [
      "회원 탈퇴가 완료되었습니다.",
      "보다 나은 궁금해 약으로 다시 뵐 수 있기를 기대합니다",
    ],
  },
};

const WithDrawl = () => {
  const [isOpenModal, setIsOpenModal] = useState({
    withdrawal: false,
    successWithdrawal: false,
  });

  const handleClickWithdrawal = useCallback(() => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        withdrawal: !cur.withdrawal,
      };
    });
  }, []);

  const handleClickSuccessWithdrawal = useCallback(() => {
    setIsOpenModal((cur) => {
      return {
        ...cur,
        successWithdrawal: !cur.successWithdrawal,
      };
    });
  }, []);

  return (
    <>
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
      {isOpenModal.withdrawal && (
        <WithDrawalModal
          {...submitModalData.customerCenter}
          isOpenModal={isOpenModal.withdrawal}
          handleCloseWithDrawl={handleClickWithdrawal}
          handleOpenSuccessWithDrawal={handleClickSuccessWithdrawal}
        />
      )}

      {isOpenModal.successWithdrawal && (
        <SubmitResultModal
          {...submitModalData.withdrawal}
          isOpenModal={isOpenModal.successWithdrawal}
          handleCloseSubmitResult={handleClickSuccessWithdrawal}
        />
      )}
    </>
  );
};

export default WithDrawl;
