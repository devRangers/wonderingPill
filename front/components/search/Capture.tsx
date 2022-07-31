import { useState } from "react";
import { CaptureButton, CaptureContainer } from "./FindWithImage.style";

interface CaptureProp {
  cameraOn: boolean;
}

function Capture({ cameraOn }: CaptureProp) {
  const [source, setSource] = useState("");

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        // 이미지를 서버에 보내주면 됨!
      }
    }
  };

  return (
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
  );
}

export default Capture;
