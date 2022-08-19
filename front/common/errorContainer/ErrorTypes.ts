import { ROUTE } from "@utils/constant";

export const SnsLoginError = {
  title: "SNS 로그인 에러",
  description:
    "현재 로그인을 시도하신 이메일이\n이미 사용중인 이메일이거나\n서버 측의 문제일 수 있습니다.",
  link: ROUTE.LOGIN,
  pageName: "로그인 페이지",
};
