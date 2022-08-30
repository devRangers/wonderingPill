import Image from "next/image";
import { useState } from "react";
import { get } from "@api";
import { CaptureContainer, CaptureButton } from "./Capture.style";

interface SignedURLValues {
  statusCode: number;
  message: string;
  result: {
    fileName: string;
    url: string;
  };
}

function Capture() {
  const [source, setSource] = useState("");

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.length) {
      const file = files[0];
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      // 이미지를 서버에 보내주면 됨!

      try {
        const result = await getSignedURL();

        console.log("signed URL: ", result);
        const response = await fetch(
          new Request(result.result.url, {
            method: "PUT",
            body: file,
            headers: new Headers({
              "Content-Type": file.type,
              mode: "Access-Control-Allow-Origin",
              "x-goog-resumable": "start",
            }),
          }),
        );
        if (response.status !== 200) {
          console.log("error!");
          return;
        }
      } catch (e: any) {
        throw new Error(e);
      }
    }
  };

  const getSignedURL = () => {
    return get<SignedURLValues>("/users/presigned-url");
  };

  return (
    <>
      <Image
        src={source ? source : "/images/register_logo.png"}
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
