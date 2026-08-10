export type SongId =
  | "ellie-goulding"
  | "ellie-goulding-3"
  | "leona-lewis"
  | "paper-kites";

export interface SongConfig {
  id: SongId;
  src: string;
  title: string;
  artist: string;
}

export const SONGS: Record<SongId, SongConfig> = {
  "ellie-goulding": {
    id: "ellie-goulding",
    src: "/assets/music/ELLIE%20GOULDING%20CUT%20.mp3",
    title: "ELLIE GOULDING CUT",
    artist: "Ellie Goulding",
  },
  "ellie-goulding-3": {
    id: "ellie-goulding-3",
    src: "/assets/music/ELLIE%20GOULDING%20CUT%203.mp3",
    title: "ELLIE GOULDING CUT 3",
    artist: "Ellie Goulding",
  },
  "leona-lewis": {
    id: "leona-lewis",
    src: "/assets/music/Leona%20Lewis%20cut%201.mp3",
    title: "Leona Lewis cut 1",
    artist: "Leona Lewis",
  },
  "paper-kites": {
    id: "paper-kites",
    src: "/assets/music/Paper%20kites%20cut%201.mp3",
    title: "Paper kites cut 1",
    artist: "Paper Kites",
  },
};

export const DEFAULT_SONG: SongId = "ellie-goulding";

export function getSong(songId: SongId = DEFAULT_SONG): SongConfig {
  return SONGS[songId];
}
