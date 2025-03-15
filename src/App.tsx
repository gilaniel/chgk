import { useCallback, useEffect, useRef, useState } from "react";
import { Bg } from "./components/bg";

import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import Timer from "./components/timer";

const KEYS = [
  {
    key: "q",
    name: "заставка",
    track: "intro",
  },
  {
    key: "w",
    name: "представление",
    track: "meeting",
  },
  {
    key: "e",
    name: "волчок",
    track: "volchok",
  },
  {
    key: "r",
    name: "гонг",
    track: "gong",
  },
  {
    key: "a",
    name: "черный ящик",
    track: "box",
  },
  {
    key: "s",
    name: "знатоки",
    track: "win",
  },
  {
    key: "d",
    name: "телезирители",
    track: "lose",
  },
  {
    key: "SPACE",
    name: "остановка трека",
    track: "",
  },
];

function App() {
  const [track, setTrack] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [timer, setTimer] = useState(60)

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

  const handleSoundClick = (track: string) => {
    setTrack(track);

    audioRef.current!.currentTime = 0;
  };

  useEffect(() => {
    if (!track || !audioRef.current) return;
    if (!track && audioRef.current) {
      return;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }, [track, audioRef]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <Bg />

      <audio ref={audioRef} src={`/${track}.mp3`} />

      <div className="flex items-center gap-3 relative z-[2] mb-5 justify-center">
        {/* <Timer /> */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex text-[16px] justify-center relative z-[2] bg-[#00000096] p-5 rounded-[12px] text-white backdrop-blur-[5px]"
        style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 91%)" }}
      >
        <ul className="flex flex-col gap-2">
          {KEYS.map((item) => (
            <li key={item.key}>
              <div
                onClick={() => handleSoundClick(item.track)}
                className="uppercase"
              >
                {item.key}
              </div>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default App;
