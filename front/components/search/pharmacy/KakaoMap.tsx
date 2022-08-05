import { useRef, useEffect } from "react";
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
}

let map: any;

const searchByAddress = async (keyword: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pharmacy/search?address=${keyword}`,
  );
  const result = await res.json();
  return result;
};

function KakaoMap({ keyword, option }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const addressQuery = useQuery("address", () => searchByAddress(keyword), {
    enabled: !!keyword && option === "address",
  });

  const displayMarker = (place: any) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  };

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

  useEffect(() => {
    if (!!keyword && addressQuery.isSuccess) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const bounds = new window.kakao.maps.LatLngBounds();

      addressQuery.data.map((pharm: PharmacyResponse) => {
        geocoder.addressSearch(pharm.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            displayMarker(result[0]);
            bounds.extend(
              new window.kakao.maps.LatLng(result[0].y, result[0].x),
            );
          }
          map.setBounds(bounds);
        });
      });
    }
  }, [keyword, addressQuery.isSuccess]);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
