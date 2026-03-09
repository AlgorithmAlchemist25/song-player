import { useState, useRef } from "react";
import "./styles.css";


import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";


import prevIcon from "../assets/previous.png";
import nextIcon from "../assets/next.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause.png";


import iris from "../songs/iris.mp3";
import eyes from "../songs/eyes.mp3";
import aboutYou from "../songs/aboutYou.mp3";
import mohabbat from "../songs/mohabbat.mp3";
import khat from "../songs/khat.mp3";

export default function SongPlayer() {

  const songs = [iris, eyes, aboutYou, mohabbat, khat];
  const images = [img1, img2, img3, img4, img5];

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);


  const audioRef = useRef(null);

  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  function nextSong() {
    const next = (currentSong + 1) % songs.length;

    setCurrentSong(next);

    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  }

  function prevSong() {
    const prev = (currentSong - 1 + songs.length) % songs.length;

    setCurrentSong(prev);

    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  }


  function handleEnded() {
    const next = (currentSong + 1) % songs.length;

    setCurrentSong(next);

    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  }

  return (
    <div className="main-frame">

      <div className="img-container">
        <img src={images[currentSong]} alt="Song cover" />
      </div>

      <div className="menu">

        <div className="prev" onClick={prevSong}>
          <img src={prevIcon} alt="Previous song" />
        </div>

        <div className="play" onClick={togglePlay}>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play or pause"
          />
        </div>

        <div className="next" onClick={nextSong}>
          <img src={nextIcon} alt="Next song" />
        </div>

      </div>

      <audio
        ref={audioRef}
        src={songs[currentSong]}
        onTimeUpdate={updateProgress}
        onEnded={handleEnded}
      />

    </div>
  );
}