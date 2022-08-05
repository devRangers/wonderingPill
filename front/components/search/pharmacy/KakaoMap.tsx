import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { PharmacyResponse } from "@modelTypes/pharmacyResponse";
import { Map } from "./SearchPharmPage.style";

declare global {
  interface Window {
    kakao: any;
  }
}
interface KakaoMapProps {
  keyword: string;
  option: string;
  isSubmitBtnClicked: boolean;
  setIsSubmitBtnClicked: Dispatch<SetStateAction<boolean>>;
}

let map: any;

const searchPharm = async (keyword: string, option: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pharmacy/search?${option}=${keyword}`,
  );
  const result = await res.json();
  return result;
};

function KakaoMap({
  keyword,
  option,
  isSubmitBtnClicked,
  setIsSubmitBtnClicked,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useQuery("searchPharm", () => searchPharm(keyword, option), {
    enabled: !!keyword && isSubmitBtnClicked,
    onSuccess: (data) => {
      setIsSubmitBtnClicked(false);

      const geocoder = new window.kakao.maps.services.Geocoder();
      const bounds = new window.kakao.maps.LatLngBounds();

      data.map((pharm: PharmacyResponse) => {
        geocoder.addressSearch(pharm.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: new window.kakao.maps.LatLng(result[0].y, result[0].x),
            });
            bounds.extend(
              new window.kakao.maps.LatLng(result[0].y, result[0].x),
            );
          }
          map.setBounds(bounds);
        });
      });
    },
  });

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

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
