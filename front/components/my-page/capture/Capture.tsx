import Image from "next/image";
import { get, patch } from "@api";
import { userAtom } from "@atom/userAtom";
import { SigninResponse as CurrentUserResponse } from "@modelTypes/signinResponse";
import { CaptureContainer, CaptureButton } from "./Capture.style";
import { useAtom } from "jotai";

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
    const newUrl = URL.createObjectURL(file);

    try {
      const result = await getSignedURL();

      await fetch(result.result.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      await patch(`/users/save-profileImg?img=${newUrl}`);
      const { user: curUser } = await get<CurrentUserResponse>("/auth/current");

      setUser(curUser);
    } catch (e: any) {
      console.error(e);
    }
  };

  const getSignedURL = () => {
    return get<SignedURLValues>("/users/presigned-url");
  };

  return (
    <>
      <Image
        src={user.profileImg ? user.profileImg : "/images/logo.png"}
        alt="wondering-pill-logo"
        layout="fill"
        objectFit="cover"
        style={{
          borderRadius: "50%",
        }}
        priority={true}
      />
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
