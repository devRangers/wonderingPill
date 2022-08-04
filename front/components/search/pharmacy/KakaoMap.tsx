import { useRef, useEffect } from "react";
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

function KakaoMap({ keyword, option }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchKeyword = option === "address" ? keyword + " 약국" : keyword;

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
    if (keyword.length > 0) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(
        searchKeyword,
        (data: any, status: any, pagination: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }
            map.setBounds(bounds);
          }
        },
      );
    }
  }, [keyword]);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
