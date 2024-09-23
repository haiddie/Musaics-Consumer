



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
    const [newdata, setNewData] = useState<any>([]);
    useEffect(() => {
        // Set the selected song to the playback ID of the first song in the list
        let newArr: any[] = []
        if (data.length > 0 && !tempItem) {
            data.map((track: any) => {
                if (track.status === "published") {
                    newArr.push(track)
                }
            })
            setNewData(newArr)

        }
    }, [data]);


    useEffect(() => {
        if (newdata && newdata.length > 0 && !tempItem) {
            setTempItem(newdata[0]?.main_content);
            setCurSongIndex(0)
        }
    }, [newdata])
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
        const currentIndex = newdata.findIndex(
            (track: any) => track.main_content.playback_id === selectedSong
        );

        // Check if the current track is found
        if (currentIndex !== -1) {
            let nextTrackIndex = currentIndex + 1;

            // Iterate through the next tracks until a published track is found
            while (nextTrackIndex < newdata.length) {
                const nextTrack = newdata[nextTrackIndex];
                if (nextTrack.status === 'published') {
                    setCurSongIndex(nextTrackIndex);
                    change_music_track(nextTrack, 1);
                    return;
                }
                nextTrackIndex++;
            }

            // If no next published track is found, restart from the first published track
            for (let i = 0; i < newdata.length; i++) {
                if (newdata[i].status === 'published') {
                    setCurSongIndex(i);
                    change_music_track(newdata[i], 1);
                    return;
                }
            }
        }

        // Optionally, handle the case where no published tracks are found
        console.log('No more published tracks available.');
    };



    const change_music_track = (track: any, index: number) => {
        const playTrack = (trackToPlay: any, trackIndex: number) => {
            setSelectedSong(null);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setSelectedSong(trackToPlay.main_content.playback_id);
                setSelectedImage(trackToPlay.main_content.thumbnail_url);
                setTempItem(trackToPlay.main_content);
                setCurSongIndex(trackIndex);

                setTimeout(() => {
                    const video: any = document.getElementById('trackPlayer');

                    video.play().then(function () {
                        // autoplay was successful!
                    }).catch(function (error: any) {
                        console.log("autoplay error", error);
                    });
                }, 2000);
            }, 1000);
        };

        const currentIndex = newdata.findIndex(
            (ob: any) => ob.main_content.playback_id === track.main_content.playback_id
        );

        if (index === 0) {
            playTrack(track, currentIndex);
        } else if (index === 1) {
            for (let i = currentIndex; i < data.length; i++) {
                if (newdata[i].status === 'published') {
                    playTrack(newdata[i], i);
                    return;
                }
            }
            console.log('No next published track found.');
        } else if (index === -1) {
            for (let i = currentIndex; i >= 0; i--) {
                if (newdata[i].status === 'published') {
                    playTrack(newdata[i], i);
                    return;
                }
            }
            console.log('No previous published track found.');
        }
    };





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

            <div className="h-[25vh]">
                {loading ? (<>
                    <div className="flex flex-col h-[264px] justify-center items-center p-4">
                        <div className="flex justify-center">

                            <h1>Loading</h1>
                        </div>
                    </div>
                </>) : (<>

                    <div className="relative" style={{ height: activeTab === 'Music' ? '200.5px' : '80px', display: 'flex', alignItems: 'center' }}>
                        {newdata[curSongIndex - 1] && activeTab === 'Music' ? (<>

                            <button type="button" className="absolute left-2 z-[22] top-15"
                                onClick={() => change_music_track(newdata[curSongIndex - 1], -1)}
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
                                {activeTab !== 'Music' && (
                                    <div className="flex items-center justify-start">
                                        {newdata.map((item: any, index: number) => {
                                            if (item.main_content.playback_id === selectedSong) {
                                                return (
                                                    <span key={index} className="px-3 !text-violet-500 text-sm max-w-[90vw] truncate">
                                                        {index + 1}. {item.main_content.name}
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}
                                <MuxPlayer
                                    theme="classic"
                                    style={{ maxWidth: '90vw', height: '50px', width: '100vw' }}
                                    audio
                                    onPlay={() => { updatePlayState(true); play_track() }}
                                    onEnded={track_ended}
                                    ref={playerRef}
                                    playbackId={selectedSong}
                                    metadata-video-title={newdata.find((item: any) => item.main_content.playback_id === selectedSong)?.main_content.name}

                                />
                            </div>
                        )}

                        {newdata[curSongIndex + 1] && activeTab === 'Music' ? (<>

                            <button type="button" className="absolute right-2 z-[22] top-15"
                                onClick={() => change_music_track(newdata[curSongIndex + 1], 1)}
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
                <div className="mt-5 py-2 h-[50vh] overflow-y-auto overflow-x-hidden">

                    {newdata && selectedSong && newdata.length > 0 && activeTab === 'Music' ? (
                        newdata.map((item: any, index: number) => (
                            <div key={index}>

                                {item.status === "published" &&
                                    < div className={`px-5 py-2`}>
                                        <div onClick={() => change_music_track(item, 0)} className="cursor-pointer focus:outline-none flex items-center gap-x-2">
                                            <div className={`grid grid-cols-12 w-full gap-x-2 py-2 border-b-[0.5px] ${selectedSong === item?.main_content?.playback_id ? 'border-b-white' : 'border-b-gray-400'}`}>
                                                <div className="col-span-1">
                                                    <div className="flex h-full items-start justify-start">
                                                        <img src={item?.main_content?.thumbnail_url}
                                                            onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src = "/images/music_placeholder.png";

                                                                if (selectedSong === item?.main_content?.playback_id) setSelectedImage("/images/music_placeholder.png");
                                                            }}
                                                            alt={item.name} className="w-[20px] h-[20px] object-cover" />
                                                    </div>

                                                </div>
                                                <div className="col-span-9">

                                                    <div className="flex h-full items-start justify-start">
                                                        <p className={`text-[14px] font-medium leading-tight ${selectedSong === item?.main_content?.playback_id ? 'text-white' : 'opacity-30'}`}
                                                        >
                                                            {index + 1}.
                                                        </p>
                                                        <p className={`text-[14px] px-1 font-medium leading-tight ${selectedSong === item?.main_content?.playback_id ? 'text-white' : 'opacity-30'}`}
                                                        >
                                                            {' ' + item?.main_content?.name}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <div className="flex h-full items-start justify-end">


                                                        <div className={`text-[14px]  font-medium rtl:text-right ${selectedSong === item?.main_content?.playback_id ? ' text-white' : 'opacity-30'}`} dangerouslySetInnerHTML={{ __html: convertToMmSs(item?.main_content?.duration) }} />

                                                    </div>
                                                </div>
                                            </div >
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    ) : (
                        <div className="mt-2 text-base text-gray-500">
                            No Music Found!
                        </div>
                    )}

                </div>
            )
            }


        </div >
    )
}

export default MusicTrack;