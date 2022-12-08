import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { BottomContainer, ModifyUserDataButton } from "./MyPage.style";
import Template from "./Template";
import Medication from "./Medication";
import InterestPharmacy from "./InterestPharmacy";
import { ROUTE } from "@utils/constant";

function MyPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: ROUTE.MY_PAGE_MODIFY,
    });
  };
  return (
    <Template gridTemplateRows="1fr 1.4fr 1.5fr 0.5fr">
      <Medication />
      <InterestPharmacy />
      <BottomContainer>
        <ModifyUserDataButton onClick={handleClick}>
          개인정보수정
        </ModifyUserDataButton>
      </BottomContainer>
    </Template>
  );
}

export default MyPage;
