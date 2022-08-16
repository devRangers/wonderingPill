import { useState } from "react";
import {
  CaptureButton,
  CaptureContainer,
} from "../../components/search/FindWithImage.style";

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
