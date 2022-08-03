import { useState, useRef, useEffect } from "react";
import { Map } from "./SearchPharmPage.style";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(() => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          return newCoords;
        });
      });
    }
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
    });
  }, [coords]);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
