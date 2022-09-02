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

      try {
        const result = await getSignedURL();

        const res = await fetch(result.result.url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "application/octet-stream",
          }
        })
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
