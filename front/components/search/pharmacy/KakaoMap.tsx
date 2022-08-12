import { useRef, useEffect } from "react";
import { PharmacyResponse } from "@modelTypes/pharmacyResponse";
import { Map } from "./SearchPharmPage.style";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  pharmList: PharmacyResponse[];
}

let map: any;

function KakaoMap({ pharmList }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const options = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
            level: 3,
          };
          map = new window.kakao.maps.Map(mapRef.current, options);
        });
      } else {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        map = new window.kakao.maps.Map(mapRef.current, options);
      }
    });
  }, []);

  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const bounds = new window.kakao.maps.LatLngBounds();

    pharmList.map((pharm) => {
      geocoder.addressSearch(pharm.address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(result[0].y, result[0].x),
          });
          bounds.extend(new window.kakao.maps.LatLng(result[0].y, result[0].x));
        }
        map.setBounds(bounds);
      });
    });
  }, [pharmList]);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
