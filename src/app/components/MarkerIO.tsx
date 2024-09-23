'use client';

import { useEffect } from "react";
import markerSDK from '@marker.io/browser';


const MarkerIO = () => {
    useEffect(() => {
        initMarker();
    }, [])

    const initMarker = async () => {
        try {
            const widget = await markerSDK.loadWidget({
                project: '6595c7a140445348ddbdb781',
            });


        } catch (error) {
            console.log('error in marker: ', error)
        }
    }

    return (<></>)
}

export default MarkerIO;