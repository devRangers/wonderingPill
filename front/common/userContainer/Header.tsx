import Link from "next/link";
import { useRouter } from "next/router";
import { ACCENT_COLOR, ROUTE } from "@utils/constant";
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
        <IconBtn $btnColor={ACCENT_COLOR}>
          <AiOutlineLeft />
        </IconBtn>
      </Link>

      <LinkBtn onClick={linkBtnClickHandler} $btnColor={ACCENT_COLOR}>
        {isLoginPage ? "회원가입 바로가기" : "로그인 바로가기"}
      </LinkBtn>
    </>
  );
}

export default Header;
