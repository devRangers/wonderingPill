import { useRef, useEffect } from "react";
import { Map } from "./SearchPharmPage.style";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const options = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
        });
      } else {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
      }
    });
  }, []);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
