import Image from "next/image";
import { useState } from "react";
import { CaptureContainer, CaptureButton } from "./Capture.style";

function Capture() {
  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.length) {
      const file = files[0];
      const newUrl = URL.createObjectURL(file);
      // 여기서 서버로 이미지 전송!
    }
  };

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
          onChange={handleCapture}
          style={{ display: "none" }}
        />
        <CaptureButton htmlFor="icon-button-file" />
      </CaptureContainer>
    </>
  );
}

export default Capture;
