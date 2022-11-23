import React from "react";
import { CaptureButton, Container } from "./CaptureContainer.style";

interface CaptureContainerProp {
  handleCapture: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function CaptureContainer({ handleCapture }: CaptureContainerProp) {
  return (
    <Container>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={handleCapture}
        style={{ display: "none" }}
      />
      <CaptureButton htmlFor="icon-button-file" />
    </Container>
  );
}

export default CaptureContainer;
