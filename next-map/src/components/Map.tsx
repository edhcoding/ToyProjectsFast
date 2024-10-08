"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { locationState, mapState } from "@/atom";
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from "recoil";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    // kakao map 로드 함수
    window.kakao.maps.load(() => {
      // React에서는 우리가 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 밑에 붙게 되어 있음
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
