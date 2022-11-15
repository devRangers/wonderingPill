import { useRef, useEffect } from "react";
import { PharmacySearchResponse as PharmacyValues } from "@modelTypes/pharmacySearchResponse";
import { Map } from "./SearchPharmPage.style";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  pharmList: PharmacyValues[];
}

let map: any;

const INIT_COORDS = { lat: 33.450701, long: 126.570667 };

function KakaoMap({ pharmList }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const renderMap = (lat: number, long: number) => {
    const options = {
      center: new window.kakao.maps.LatLng(lat, long),
      level: 3,
    };
    map = new window.kakao.maps.Map(mapRef.current, options);
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            renderMap(position.coords.latitude, position.coords.longitude),
          () => renderMap(INIT_COORDS.lat, INIT_COORDS.long),
        );
      } else {
        renderMap(INIT_COORDS.lat, INIT_COORDS.long);
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

          const iwContent = `<div style="padding: 8px 1px; font-size:0.7rem;">${pharm.name}</div>`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: true,
          });

          window.kakao.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
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
