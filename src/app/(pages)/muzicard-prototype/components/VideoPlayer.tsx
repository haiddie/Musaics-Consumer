import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef } from "react";

export default function MuxVideoPlayer({ data, index }: any) {
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
    <MuxPlayer
      style={{ maxWidth: '100%', height: '135px' }}
      playbackId={data?.main_content?.playback_id}
      onPlay={play_video}
      ref={playerRef}
      metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
      }}
    />
  );
}
