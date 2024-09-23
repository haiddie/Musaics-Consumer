'use client';
import { GoogleMap as ReactoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo, useCallback, useEffect, useState } from 'react';

const containerStyle = {
  height: '300px',
  // maxWidth: window.innerWidth >= 600 ? '550px' : window.innerWidth - 40 + 'px',
  // height: window.innerWidth >= 600 ? '550px' : window.innerWidth + 'px',
  width: typeof window !== 'undefined' ? (window.innerWidth >= 600 ? '550px' : window.innerWidth - 100 + 'px') : '550px',
  borderRadius: '8px'
};

const mapOptions = {
  zoom: 8
};

const GoogleMap = ({ data }: any) => {
  const [map, setMap] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(18)
  const [screenWidth, setScreenWidth] = useState(0);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  })

  // #region FUNCTIONS



  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  useEffect(() => {
    if (data.zoomLevel) {
      setZoomLevel(data?.zoomLevel)
      containerStyle.height = '300px';
      //containerStyle.width = '600px'
      // containerStyle.maxWidth = window.innerWidth >= 600 ? '550px' : window.innerWidth - 40 + 'px';
      // containerStyle.width = window.innerWidth >= 600 ? '550px' : window.innerWidth - 40 + 'px';
    }

  }, [zoomLevel])


  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const handleResize = () => {
  //       setScreenWidth(window.innerWidth);
  //     };
  //     setScreenWidth(window.innerWidth);

  //     if (window.innerWidth) {
  //       containerStyle.height = data?.height;
  //       containerStyle.width = window.innerWidth >= 600 ? '600px' : window.innerWidth + 'px';
  //     }
  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, []);

  // #endregion
  return isLoaded ? (
    <div className='relative h-[300px]'>
      <ReactoogleMap
        mapContainerStyle={containerStyle}
        center={data}
        zoom={data.zoom ? data.zoom : 11}
        // onLoad={onLoad}
        onUnmount={onUnmount}
      >

      </ReactoogleMap>
    </div>
  ) : <></>
}

export default memo(GoogleMap)