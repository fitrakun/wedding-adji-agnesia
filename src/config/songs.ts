export type SongId = "love-love-love" | "stephen-sanchez-love-love-love";

export interface SongConfig {
  id: SongId;
  src: string;
  title: string;
  artist: string;
}

export const SONGS: Record<SongId, SongConfig> = {
  "love-love-love": {
    id: "love-love-love",
    src: "/assets/music/Love%20Love%20Love%20Cutted%20Version.MP3",
    title: "Love Love Love",
    artist: "",
  },
  "stephen-sanchez-love-love-love": {
    id: "stephen-sanchez-love-love-love",
    src: "/assets/music/Stephen%20Sanchez%20-%20LOVE%2C%20LOVE%2C%20LOVE.mp3",
    title: "LOVE, LOVE, LOVE",
    artist: "Stephen Sanchez",
  },
};

export const DEFAULT_SONG: SongId = "love-love-love";

export function getSong(songId: SongId = DEFAULT_SONG): SongConfig {
  return SONGS[songId];
}
