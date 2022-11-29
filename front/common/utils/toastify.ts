import { toast } from "react-toastify";

export const MESSAGE = {
  LOGIN_FAIL: "이메일이나 비밀번호를 확인해주세요.",
  NEED_LOGIN: "로그인이 필요한 서비스입니다.",
  SAVE_ALARM: "알림을 설정했습니다.",
  CANCEL_ALARM: "알림을 취소했습니다.",
  OPTION_SHAPE_FAIL: "체형을 하나 이상 선택해 주세요",
  OPTION_COLOR_FAIL: "색상을 하나 이상 선택해 주세요",
  FAIL: "잠시 후 다시 시도해 주세요.",
};

export const Toastify = {
  success(message: string) {
    toast.success(message);
  },
  fail(message: string = MESSAGE.FAIL) {
    toast.error(message);
  },
  info(message: string) {
    toast.info(message);
  },
};
