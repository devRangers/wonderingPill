import MyPage from "@mypage//MyPage";
import { NextSeo } from "next-seo";
import { MY_PAGE_SEO } from "next-seo.config";

function index() {
  return (
    <>
      <NextSeo {...MY_PAGE_SEO} />
      <MyPage />
    </>
  );
}

export default index;
