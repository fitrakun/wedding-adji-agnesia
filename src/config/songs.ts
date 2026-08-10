export type SongId = "ellie-goulding-3";

export interface SongConfig {
  id: SongId;
  src: string;
  title: string;
  artist: string;
}

export const SONGS: Record<SongId, SongConfig> = {
  "ellie-goulding-3": {
    id: "ellie-goulding-3",
    src: "/assets/music/ELLIE%20GOULDING%20CUT%203.mp3",
    title: "ELLIE GOULDING CUT 3",
    artist: "Ellie Goulding",
  },
};

export const DEFAULT_SONG: SongId = "ellie-goulding-3";

export function getSong(songId: SongId = DEFAULT_SONG): SongConfig {
  return SONGS[songId];
}
