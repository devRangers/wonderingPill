import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import CaptureContainer from "@capture/CaptureContainer";
import { ROUTE } from "@utils/constant";
import { Toastify } from "@utils/toastify";
import { putImageOnGCS } from "api/common";
import {
  getPreSignedURL,
  postImageToAIServer,
  deleteImageOnGCS,
} from "api/search/capture";

function Capture() {
  const router = useRouter();

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      Toastify.fail();
      return;
    }

    try {
      const uuid = Date.now().toString();
      const { result } = await getPreSignedURL(uuid);
      await putImageOnGCS(result.url, files[0]);
      const imgURL = result.url.split("png")[0] + "png";

      await postImageToAIServer({ imgURL });
      await deleteImageOnGCS(uuid);
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
      <CaptureContainer handleCapture={handleCapture} />
    </>
  );
}

export default Capture;
