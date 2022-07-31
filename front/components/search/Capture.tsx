import { useEffect, useRef, useState } from "react";
import { CaptureButton, CaptureContainer } from "./FindWithImage.style";

interface CaptureProp {
  cameraOn: boolean;
}

function Capture({ cameraOn }: CaptureProp) {
  const [source, setSource] = useState("");

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  return (
    <CaptureContainer>
      {source && <img src={source} alt={"snap"}></img>}
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        style={{ display: "none" }}
      />
      <CaptureButton htmlFor="icon-button-file"></CaptureButton>
    </CaptureContainer>
  );
}

export default Capture;
