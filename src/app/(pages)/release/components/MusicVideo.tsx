import React, { useState, useEffect, useRef } from 'react';
import MuxVideoPlayer from './VideoPlayer';
import MuxPlayer from "@mux/mux-player-react";

const MusicVideo = ({ data }: any) => {
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

            <div className="my-5">
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
            <div className="py-2 h-[32vh] overflow-y-auto overflow-x-hidden">

                {data && data.length > 0 ? (
                    data.map((item: any, index: number) => (
                        <div key={index} className={`p-5`}>
                            <div onClick={() => handleSongClick(item?.main_content)} className="focus:outline-none flex items-center gap-x-6">
                                <div className="flex items-center justify-start basis-[15%] w-[15%]">
                                    <img src={item?.main_content?.thumbnail_url} alt={item.name} className="w-[60px] h-[60px] object-cover" />
                                </div>
                                <div className={`w-[85%] flex flex-col text-white basis-[85%]`}>
                                    <div className={`text-[14px] truncate font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? 'text-white' : 'opacity-30'}`} dangerouslySetInnerHTML={{ __html: item?.main_content?.name }} />

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

        </div>
    )
};

export default MusicVideo;