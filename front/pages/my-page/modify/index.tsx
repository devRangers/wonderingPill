import ModifyPage from "@mypage//modify/ModifyPage";
import { NextSeo } from "next-seo";
import { MY_PAGE_SEO } from "next-seo.config";

function index() {
  return (
    <>
      <NextSeo {...MY_PAGE_SEO} />
      <ModifyPage />
    </>
  );
}

export default index;
