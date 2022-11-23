const DEFAULT_SEO = {
  title: undefined,
  defaultTitle: "궁금해 약",
  titleTemplate: "%s | 궁금해 약",
  description:
    "궁금해 약 서비스를 사용해서 약을 검색하고, 약 알림 푸시를 설정 해 보세요.",
  canonical: "https://www.wondering-pills.com",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "http://localhost:3000/",
    title: "궁금해 약에 방문 해 보세요!",
    site_name: "안녕",
    images: [
      {
        url: "/images/logo.png",
        width: 320,
        height: 180,
        alt: "궁금해 약 메인 이미지",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

const MY_PAGE_SEO = {
  title: "마이 페이지",
  description:
    "궁금해 약 마이 페이지에요. 복용중인 약과 즐겨찾기 한 약국을 확인할 수 있으며, 개인정보 수정이 가능합니다.",
};

const LOGIN_SEO = {
  title: "로그인",
  description: "궁금해 약 로그인 페이지에요.",
};

const FIND_EMAIL_SEO = {
  title: "계정 찾기",
  description:
    "궁금해 약 계정 찾기 페이지에요. 이름과 생년월일을 입력하시면 계정을 찾을 수 있어요",
};

const EMAIL_RESULT_SEO = {
  title: "계정 찾기 결과",
  description:
    "궁금해 약 계정 찾기 결과 페이지에요. 계정 찾기 페이지에서 입력한 정보의 계정을 확인할 수 있어요.",
};

const FIND_PASSWORD_SEO = {
  title: "비밀번호 찾기",
  description:
    "궁금해 약 비밀번호 찾기 페이지에요. 이메일과 이름, 생년월일을 입력하시면 비밀번호를 찾을 수 있어요",
};

const NEW_PASSWORD_SEO = {
  title: "새로운 비밀번호",
  description:
    "궁금해 약 비밀번호 새로 만들기 페이지에요. 새롭게 사용할 비밀번호를 등록해주세요",
};

const SEARCH_IMAGE_SEO = {
  title: "사진으로 찾기",
  description:
    "궁금해 약 사진으로 찾기 페이지에요. 알고 싶은 알약의 사진을 찍어서 업로드 해보세요.",
};

const OPTION_SEO = {
  title: "약 검색",
  description:
    "궁금해 약 머신러닝 결과 페이지에요. 머신러닝의 결과물을 확인하고 추가적으로 추가할 옵션이 있다면 추가해 보세요.",
};

const RESULT_SEO = {
  title: "검색 결과",
  description:
    "궁금해 약 검색 결과 페이지에요. 검색 결과 리스트 들 중 알고 싶은 약을 선택해보세요.",
};

const REGISTER_SEO = {
  title: "회원가입",
  description: "궁금해 약 회원가입 페이지에요.",
};

const SET_NOTIFICATION_SEO = {
  title: "알림 설정",
  description: "알림 설정 페이지에요. 복약 알림을 설정할 수 있어요.",
};

const NOTIFICATIONS_SEO = {
  title: "알림 목록",
  description:
    "알림 목록 페이지에요. 지난 알림을 확인하고 복약 여부를 설정할 수 있어요.",
};

const PHARMACY_SEO = {
  title: "약국 찾기",
  description:
    "약국 찾기 페이지에요. 검색으로 약국의 위치와 영업시간 등의 약국 정보를 확인할 수 있어요.",
};

const GUIDE_SEO = {
  title: "설치 가이드",
  description:
    "궁금해 약 설치 가이드 페이지에요. android, ios, chrome에서 궁금해 약을 설치할 수 있어요.",
};

export {
  DEFAULT_SEO,
  MY_PAGE_SEO,
  LOGIN_SEO,
  FIND_EMAIL_SEO,
  EMAIL_RESULT_SEO,
  FIND_PASSWORD_SEO,
  NEW_PASSWORD_SEO,
  SEARCH_IMAGE_SEO,
  OPTION_SEO,
  RESULT_SEO,
  REGISTER_SEO,
  SET_NOTIFICATION_SEO,
  NOTIFICATIONS_SEO,
  PHARMACY_SEO,
  GUIDE_SEO,
};
