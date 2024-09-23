import { useEffect, useRef } from "react";
import styles from "./MuxPlayerCuePointsMeditate.module.css";
import MuxPlayer from "@mux/mux-player-react";


function MuxAudioPlayer({ data, index }: any) {

  const play_video = () => {
    const track: any = document.getElementById("muxPlayer");

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
        playerElement.id = "videoPlayer" + index;
      }
    }, 1000)
  }, [playerRef]); // 

  return (
    <div
      className={styles.main}

    >
      <MuxPlayer
        audio
        style={{ maxWidth: '100%', height: '125px', background: 'black' }}
        onPlay={play_video}
        ref={playerRef}
        playbackId={data?.main_content?.playback_id}
        metadata-video-title={data?.main_content?.name}
        poster={data?.main_content?.thumbnail_url}
      />
    </div>
  );
}

export default MuxAudioPlayer;
