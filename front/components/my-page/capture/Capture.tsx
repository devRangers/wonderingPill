import { get, patch } from "@api";
import { userAtom } from "@atom/userAtom";
import { SigninResponse as CurrentUserResponse } from "@modelTypes/signinResponse";
import { AUTH, USERS } from "@utils/endpoint";
import { CaptureContainer, CaptureButton } from "./Capture.style";
import { useAtom } from "jotai";
import ProfileImg from "./ProfileImg";

interface SignedURLValues {
  statusCode: number;
  message: string;
  result: {
    fileName: string;
    url: string;
  };
}

function Capture() {
  const [user, setUser] = useAtom(userAtom);

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    const file = files[0];

    try {
      const { result } = await getSignedURL();

      await fetch(result.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      const imgUrl = result.url.split("png")[0] + "png";

      await patch(USERS.PROFILE_IMG(imgUrl));
      const { user: curUser } = await get<CurrentUserResponse>(AUTH.CURRENT);

      setUser(curUser);
    } catch (e: any) {
      console.error(e);
    }
  };

  const getSignedURL = () => {
    return get<SignedURLValues>(USERS.PRESIGNED_URL);
  };

  return (
    <>
      {typeof user.profileImg === "string" && user.profileImg.length > 0 && (
        <ProfileImg profileImg={user.profileImg} />
      )}
      <CaptureContainer>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleCapture}
          style={{ display: "none" }}
        />
        <CaptureButton htmlFor="icon-button-file" />
      </CaptureContainer>
    </>
  );
}

export default Capture;
