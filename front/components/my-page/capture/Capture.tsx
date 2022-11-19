import CaptureContainer from "@capture/CaptureContainer";
import { userAtom } from "@atom/userAtom";
import { Toastify } from "@utils/toastify";
import { getSignedURL, getUser, patchProfileImg } from "@mypage/api";
import { putImageOnGCS } from "api/common/commonApi";
import ProfileImg from "./ProfileImg";
import { useAtom } from "jotai";

function Capture() {
  const [user, setUser] = useAtom(userAtom);

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      Toastify.fail();
      return;
    }

    try {
      const { result } = await getSignedURL();
      await putImageOnGCS(result.url, files[0]);
      const imgUrl = result.url.split("png")[0] + "png";
      await patchProfileImg(imgUrl);
      const { user: curUser } = await getUser();
      setUser(curUser);
    } catch (e) {
      console.error(e);
      Toastify.fail();
    }
  };

  return (
    <>
      {typeof user.profileImg === "string" && user.profileImg.length > 0 && (
        <ProfileImg profileImg={user.profileImg} />
      )}
      <CaptureContainer handleCapture={handleCapture} />
    </>
  );
}

export default Capture;
