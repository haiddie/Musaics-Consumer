import React, { useState, useEffect, useRef } from 'react';
import MuxVideoPlayer from './VideoPlayer';
import MuxPlayer from "@mux/mux-player-react";

const MusicVideo = ({ data, playState }: any) => {
    const [openAccordion, setOpenAccordion] = useState(1);
    const [selectedSong, setSelectedSong] = useState("");
    // #region FUNCTIONS





    useEffect(() => {
        // Set the selected song to the playback ID of the first song in the list
        if (data.length > 0) {
            setSelectedSong(data[0]?.main_content?.playback_id);
        }
    }, [data]);

    const handleSongClick = (item: any) => {
        setSelectedSong(item.playback_id);
        // Here you can handle playing the song using its playbackId
        // For simplicity, I'm just logging the selected song ID
        <MuxPlayer theme="classic"
            style={{ maxWidth: '100%', height: '175px' }}
            audio
            title={item.name}
            playbackId={selectedSong}
            metadata-video-title={item.name}
            poster={item.thumbnail_url}
        />

    };


    const play_video = () => {
        const track: any = document.getElementById("trackPlayer");

        if (track) {
            track.pause();
        }
    }
    const playerRef = useRef(null);


    const convertToMmSs = (seconds: number) => {
        const totalSeconds = Math.floor(seconds);
        const mm = Math.floor(totalSeconds / 60);
        const ss = totalSeconds % 60;
        return `${padNumber(mm)}:${padNumber(ss)}`;
    }

    const padNumber = (num: number) => {
        return num.toString().padStart(2, "0");
    }


    useEffect(() => {
        // Accessing the current property of the ref to get the DOM element
        setTimeout(() => {
            const playerElement: any = playerRef.current;

            // Checking if the player element exists before setting its id
            if (playerElement) {
                playerElement.id = "videoPlayer";
            }
        }, 1000)
    }, [playerRef]); // 

    // #endregion
    return (
        <div>

            <div className="h-[25vh]">
                {/* MuxPlayer component to play the selected song */}
                {selectedSong && (
                    <MuxPlayer
                        theme="classic"
                        style={{ maxWidth: '100%', height: '175px' }}
                        onPlay={play_video}
                        ref={playerRef}
                        title={data.find((item: any) => item.main_content.playback_id === selectedSong)?.main_content.name}
                        playbackId={selectedSong}
                        metadata-video-title={data.find((item: any) => item.main_content.playback_id === selectedSong)?.main_content.name}
                        poster={data.find((item: any) => item.main_content.playback_id === selectedSong)?.main_content.thumbnail_url}
                    />
                )}
            </div>
            <div className={` ${playState ? 'h-[40vh]' : 'h-[50vh]'} overflow-y-auto overflow-x-hidden`}>

                {data && data.length > 0 ? (
                    data.map((item: any, index: number) => (
                        <div key={index} className={`px-5 py-2`}>
                            <div onClick={() => handleSongClick(item?.main_content)} className={`focus:outline-none cursor-pointer grid grid-cols-12 gap-x-2 py-2 border-b-[0.5px] ${selectedSong === item?.main_content?.playback_id ? 'border-b-white' : 'border-b-gray-400'}`}>
                                <div className="col-span-1">
                                    <div className="flex h-full items-start justify-start">
                                        <img src={item?.main_content?.thumbnail_url} alt={item.name} className="w-[20px] h-[20px] object-cover" />
                                    </div>
                                </div>
                                <div className={`col-span-9`}>
                                    <div className="flex h-full items-start justify-start">
                                        <div className={`text-[14px] break-all  font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? 'text-white' : 'opacity-30'}`} dangerouslySetInnerHTML={{ __html: item?.main_content?.name }} />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex h-full items-start justify-end">


                                        <div className={`text-[14px]  font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? ' text-white' : 'opacity-30'}`} dangerouslySetInnerHTML={{ __html: convertToMmSs(item?.main_content?.duration) }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="mt-2 text-base text-gray-500">
                        No Music Found!
                    </div>
                )}

            </div>

        </div >
    )
};

export default MusicVideo;