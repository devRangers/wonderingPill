import { memo } from "react";
import { Camera, ImageWrapper } from "./Search.style";
import Capture from "./capture/Capture";
import { isWideDevice } from "@utils/isWideDevice";
import { MAIN_COLOR } from "@utils/constant";

function SearchWithImage() {
  const isWide = isWideDevice();
  return (
    <Camera $bgColor={MAIN_COLOR} $isWide={isWide}>
      <ImageWrapper>
        <Capture />
      </ImageWrapper>
    </Camera>
  );
}

export default memo(SearchWithImage);
