import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const isWideDevice = () => {
  const [isWide, setIsWide] = useState(false);
  const temp = useMediaQuery({ query: "(min-width : 500px)" });

  useEffect(() => {
    setIsWide(temp);
  }, [isWide]);

  return isWide;
};
