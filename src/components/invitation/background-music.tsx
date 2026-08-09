"use client";

import { useEffect, useRef, useState } from "react";
import type { SongConfig } from "@/config/songs";
import { prefersReducedMotion } from "@/lib/animation/motion-preferences";

interface BackgroundMusicProps {
  song: SongConfig;
  opened: boolean;
}

export function BackgroundMusic({ song, opened }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (prefersReducedMotion() || !opened) {
      audio.pause();
      if (audio.currentTime !== 0) audio.currentTime = 0;
      return;
    }

    let cancelled = false;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          if (cancelled) return;
        })
        .catch(() => {
          if (cancelled) return;
          setIsAvailable(false);
        });
    }

    return () => {
      cancelled = true;
      audio.pause();
    };
  }, [opened, song.id]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => setIsAvailable(false));
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className="background-music" data-song-id={song.id} data-playing={isPlaying ? "true" : "false"}>
      <audio ref={audioRef} src={song.src} loop preload="auto" />
      {isAvailable && opened && (
        <button type="button" className="background-music-toggle" onClick={togglePlay} aria-label={isPlaying ? "Matikan musik" : "Putar musik"} aria-pressed={isPlaying}>
          <span className="background-music-icon" aria-hidden="true">{isPlaying ? "\u23F9" : "\u266B"}</span>
          <span className="background-music-label">{isPlaying ? "Musik" : "Putar"}</span>
        </button>
      )}
    </div>
  );
}
