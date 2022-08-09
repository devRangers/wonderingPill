import Link from "next/link";
import { useRouter } from "next/router";
import { SUB_COLOR, ROUTE } from "@utils/constant";
import { AiOutlineLeft } from "react-icons/ai";
import { IconBtn, LinkBtn } from "./Container.style";

function Header() {
  const router = useRouter();
  const isLoginPage = router.asPath === ROUTE.LOGIN;

  const linkBtnClickHandler = () => {
    const url = isLoginPage ? ROUTE.REGISTER : ROUTE.LOGIN;
    router.push(url);
  };

  return (
    <>
      <Link href="/">
        <IconBtn $btnColor={SUB_COLOR}>
          <AiOutlineLeft />
        </IconBtn>
      </Link>

      <LinkBtn onClick={linkBtnClickHandler}>
        {isLoginPage ? "회원가입 바로가기" : "로그인 바로가기"}
      </LinkBtn>
    </>
  );
}

export default Header;
