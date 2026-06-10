export type GameResult = "homeWin" | "awayWin" | "draw" | null;

export interface Fixture {
  id: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  stage: string;
  venue: string;
  scoreA?: number;
  scoreB?: number;
  result?: GameResult;
  played?: boolean;
  knockoutRound?: "roundOf32" | "roundOf16" | "quarterFinal" | "semiFinal" | "final";
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  group: string;
}

export interface Player {
  id: string;
  name: string;
  teams: string[];
  points: number;
  joinedAt: number;
}

export interface Sweepstake {
  id: string;
  name: string;
  hostName: string;
  hostId: string;
  status: "signup" | "active" | "complete";
  players: Player[];
  fixtures: Fixture[];
  createdAt: number;
  knockoutBonuses: Record<string, Record<string, number>>;
  awards: Record<string, string>;
}