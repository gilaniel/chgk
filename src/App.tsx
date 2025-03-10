import { useCallback, useEffect, useRef, useState } from "react";
import { Bg } from "./components/bg";

import { motion } from "framer-motion";

function App() {
  const [track, setTrack] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const initAudio = () => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
  };

  const pause = () => {
    audioRef.current!.pause();
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let track = "";

    switch (e.code) {
      case "Space":
        track = "";
        pause();
        break;
      case "KeyQ":
        track = "intro";
        break;
      case "KeyW":
        track = "meeting";
        break;
      case "KeyE":
        track = "volchok";
        break;
      case "KeyR":
        track = "gong";
        break;
      case "KeyA":
        track = "box";
        break;
      case "KeyS":
        track = "win";
        break;
      case "KeyD":
        track = "lose";
        break;
      default:
        track = "";
    }

    setTrack(track);

    if (track) {
      audioRef.current!.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (!track || !audioRef.current) return;
    if (!track && audioRef.current) {
      return;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }, [track, audioRef]);

  useEffect(() => {
    initAudio();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <Bg />

      <audio ref={audioRef} src={`/${track}.mp3`} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex text-[16px] justify-center relative z-[2] bg-[#00000096] p-5 rounded-[12px] text-white backdrop-blur-[5px]"
        style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 91%)" }}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <div>Q</div>
            <span>заставка</span>
          </li>
          <li>
            <div>W</div>
            <span>представление</span>
          </li>
          <li>
            <div>E</div>
            <span>волчок</span>
          </li>
          <li>
            <div>R</div>
            <span>гонг</span>
          </li>
          <li>
            <div>A</div>
            <span>черный ящик</span>
          </li>
          <li>
            <div>S</div>
            <span>знатоки</span>
          </li>
          <li>
            <div>D</div>
            <span>телезирители</span>
          </li>
          <li>
            <div>SPACE</div>
            <span>остановка трека</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default App;
