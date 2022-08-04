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
    if (!!keyword && option === "name") {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      });
    } else if (!!keyword && option === "address") {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(keyword, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const moveLatLon = new window.kakao.maps.LatLng(
            result[0].y,
            result[0].x,
          );
          map.panTo(moveLatLon);
        }
        const ps = new window.kakao.maps.services.Places(map);

        ps.categorySearch(
          "PM9",
          (data: any, status: any, pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
              }
            }
          },
          { useMapBounds: true },
        );
      });
    }
  }, [keyword]);

  return <Map id="map" ref={mapRef} />;
}

export default KakaoMap;
