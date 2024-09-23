



'use client';

import { useState, useEffect, useRef } from "react";
import MuxAudioPlayer from "./AudioPlayer";
import MuxPlayer from "@mux/mux-player-react";


const MusicTrack = ({ data, downloads, default_image, updatePlayState, activeTab }: any) => {

    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [tempItem, setTempItem] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [curSongIndex, setCurSongIndex] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
        // Set the selected song to the playback ID of the first song in the list
        if (data.length > 0 && !tempItem) {
            setTempItem(data[0]?.main_content);
            setCurSongIndex(0)
        }
    }, [data]);
    // #region FUNCTIONS



    // #endregion

    const handleSongClick = (item: any) => {
        setSelectedSong(null);
        setTempItem(item);
        // if (selectedImage != "/images/music_placeholder.png") {
        //     setSelectedImage(item.thumbnail_url)
        // }
        // Here you can handle playing the song using its playbackId
        // For simplicity, I'm just logging the selected song ID

    };

    const track_ended = () => {

        const currentIndex = data.findIndex(
            (track: any) =>
                track.main_content.playback_id ===
                selectedSong
        );

        // Check if the current track is found and there is a next track
        if (currentIndex !== -1 && currentIndex < data.length) {
            const nextTrack = data[currentIndex + 1];
            if (nextTrack) {
                setCurSongIndex(currentIndex + 1)
                change_music_track(
                    nextTrack.main_content,
                    currentIndex + 1
                );

            }
        }
    }

    const change_music_track = (track: any, index: number) => {

        setSelectedSong(null);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSelectedSong(track.playback_id)
            setSelectedImage(track.thumbnail_url)
            setTempItem(track);
            setCurSongIndex(index)

            setTimeout(() => {
                const video: any = document.getElementById('trackPlayer');

                video
                    .play()
                    .then(function () {
                        // autoplay was successful!
                    })
                    .catch(function (error: any) {
                        // do something if you want to handle or track this error
                        console.log("autoplay error", error);
                    });
            }, 2000);
        }, 1000);

    }



    const play_track = () => {
        if (activeTab === 'Videos') {
            const track: any = document.getElementById("videoPlayer");

            if (track) {
                track.pause();
            }
        }
        else if (activeTab === 'Downloads') {
            downloads.map((obj: any, index: any) => {
                const track: any = document.getElementById("videoPlayer" + index);

                if (track) {

                    track.pause();
                }
            })
        }

    }


    useEffect(() => {
        if (!selectedSong && tempItem) {
            setSelectedSong(tempItem.playback_id);
            setSelectedImage(tempItem.thumbnail_url)
        }
    }, [selectedSong, tempItem])




    useEffect(() => {
        // Accessing the current property of the ref to get the DOM element
        setTimeout(() => {
            const playerElement: any = playerRef.current;

            // Checking if the player element exists before setting its id
            if (playerElement) {
                playerElement.id = "trackPlayer";
            }
        }, 1000)
    }, [selectedSong]); // 

    const convertToMmSs = (seconds: number) => {
        const totalSeconds = Math.floor(seconds);
        const mm = Math.floor(totalSeconds / 60);
        const ss = totalSeconds % 60;
        return `${padNumber(mm)}:${padNumber(ss)}`;
    }

    const padNumber = (num: number) => {
        return num.toString().padStart(2, "0");
    }

    return (
        <div>

            <div className="my-5">
                {loading ? (<>
                    <div className="flex flex-col h-[264px] justify-center items-center p-4">
                        <div className="flex justify-center">

                            <h1>Loading</h1>
                        </div>
                    </div>
                </>) : (<>

                    <div className="relative" style={{ height: activeTab === 'Music' ? '200.5px' : '50px', display: 'flex', alignItems: 'center' }}>
                        {data[curSongIndex - 1] && activeTab === 'Music' ? (<>

                            <button type="button" className="absolute left-2 z-[22] top-15"
                                onClick={() => change_music_track(data[curSongIndex - 1].main_content, curSongIndex - 1)}
                            >
                                <img src="/musaic-icons/previous.png" className="w-[20px] h-[20px]" />
                            </button>
                        </>) : (<>
                        </>)}



                        {selectedImage && selectedSong && (
                            <div className="flex flex-col justify-center w-full">
                                {activeTab === 'Music' && (
                                    <img src={selectedImage ? selectedImage : default_image}
                                        className="h-[150px] mx-auto w-[150px] object-cover" />
                                )}
                                <MuxPlayer
                                    theme="classic"
                                    style={{ maxWidth: '90vw', height: '50px', width: '100vw' }}
                                    audio
                                    onPlay={() => { updatePlayState(true); play_track() }}
                                    onEnded={track_ended}
                                    ref={playerRef}
                                    playbackId={selectedSong}
                                    metadata-video-title={data.find((item: any) => item.main_content.playback_id === selectedSong)?.main_content.name}

                                />
                            </div>
                        )}

                        {data[curSongIndex + 1] && activeTab === 'Music' ? (<>

                            <button type="button" className="absolute right-2 z-[22] top-15"
                                onClick={() => change_music_track(data[curSongIndex + 1].main_content, curSongIndex + 1)}
                            >
                                <img src="/musaic-icons/next-track.png" className="w-[20px] h-[20px]" />
                            </button>
                        </>) : (<>
                        </>)}
                    </div>
                </>)}
                {/* MuxPlayer component to play the selected song */}

            </div>
            {activeTab === 'Music' && (
                <div className="my-5 h-[40vh] overflow-y-auto overflow-x-hidden">

                    {data && selectedSong && data.length > 0 && activeTab === 'Music' ? (
                        data.map((item: any, index: number) => (
                            <div key={index} className={`p-5`}>
                                <div onClick={() => change_music_track(item?.main_content, index)} className="cursor-pointer focus:outline-none flex items-center gap-x-2">
                                    <div className="flex items-center justify-start basis-[80%] w-[80%] gap-x-4">
                                        <img src={item?.main_content?.thumbnail_url}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "/images/music_placeholder.png";

                                                if (selectedSong === item?.main_content?.playback_id) setSelectedImage("/images/music_placeholder.png");
                                            }}
                                            alt={item.name} className="w-[60px] h-[60px] object-cover" />

                                        <p className={`text-[14px] truncate font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? ' text-white' : 'opacity-30'}`}
                                            dangerouslySetInnerHTML={{ __html: item?.main_content?.name }} />

                                    </div>
                                    <div className={`w-[20%] flex items-center justify-center  text-white basis-[20%]`}>
                                        <div className={`text-[12px] truncate font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? 'text-white' : 'opacity-30'}`} dangerouslySetInnerHTML={{ __html: convertToMmSs(item?.main_content?.duration) }} />
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
            )}


        </div >
    )
}

export default MusicTrack;