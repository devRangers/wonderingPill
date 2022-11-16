import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTE } from "@utils/constant";
import { Toastify } from "@utils/toastify";
import { CaptureContainer, CaptureButton } from "./Capture.style";
import {
  deleteImageOnGCS,
  getPreSignedURL,
  postImageToAIServer,
  putImageOnGCS,
} from "./api";

function Capture() {
  const router = useRouter();

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    const file = files[0];

    // 순차적으로 해야함
    try {
      const { result } = await getPreSignedURL(Date.now().toString());
      await putImageOnGCS(result.url, file);
      const imgURL = result.url.split("png")[0] + "png";

      await postImageToAIServer({ imgURL });
      await deleteImageOnGCS(Date.now().toString());
    } catch (e) {
      console.error(e);
      Toastify.fail();
    }
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_AI_SERVER_URL}/classify`,
    );
    eventSource.addEventListener("sse", function (e) {
      const data = JSON.parse(e.data);
      const colors = data.colors.split("/");
      router.push({
        pathname: ROUTE.SEARCH_OPTION,
        query: {
          colors,
          letters: data.letters == "NONE" ? "" : data.letters,
          shape: data.shape,
        },
      });
    });

    eventSource.onerror = (e) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Image
        src={"/images/search/captureImage.png"}
        alt="wondering-pill-logo"
        layout="fill"
        objectFit="contain"
        priority={true}
      />
      <CaptureContainer>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          name="imgURL"
          onChange={handleCapture}
          style={{ display: "none" }}
        />
        <CaptureButton htmlFor="icon-button-file" />
      </CaptureContainer>
    </>
  );
}

export default Capture;
