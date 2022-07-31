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
      }
    }
  };

  return (
    <CaptureContainer>
      {/* {source && <img src={source} alt={"snap"}></img>} */}
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
