import CaptureContainer from "common/capture/CaptureContainer";
import { userAtom } from "@atom/userAtom";
import {
  getSignedURL,
  getUser,
  patchProfileImg,
  putImageOnGCS,
} from "@mypage/api";
import ProfileImg from "./ProfileImg";
import { useAtom } from "jotai";

function Capture() {
  const [user, setUser] = useAtom(userAtom);

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    const { result } = await getSignedURL();
    await putImageOnGCS(result.url, files[0]);
    const imgUrl = result.url.split("png")[0] + "png";
    await patchProfileImg(imgUrl);
    const { user: curUser } = await getUser();

    setUser(curUser);
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
