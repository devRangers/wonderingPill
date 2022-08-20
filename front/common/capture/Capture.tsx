import { useState } from "react";
import Image from "next/image";
import { CaptureContainer, CaptureButton } from "./Capture.style";

function Capture() {
  const [source, setSource] = useState("");

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.length) {
      const file = files[0];
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      // 이미지를 서버에 보내주면 됨!
    }
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
