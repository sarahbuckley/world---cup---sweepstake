import { Player, Sweepstake, Fixture } from "./types";
import { TEAMS_2026, POINTS_SYSTEM, FIXTURES } from "./data";

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function distributeTeams(players: Player[]): Player[] {
  const teamIds = shuffleArray(TEAMS_2026.map((t) => t.id));
  const updated = players.map((p) => ({ ...p, teams: [] as string[] }));
  teamIds.forEach((teamId, i) => {
    updated[i % updated.length].teams.push(teamId);
  });
  return updated;
}

export function calculatePoints(sweepstake: Sweepstake): Player[] {
  const players = sweepstake.players.map((p) => ({ ...p, points: 0 }));

  sweepstake.fixtures.forEach((fixture) => {
    if (!fixture.played || fixture.result === null) return;

    players.forEach((player) => {
      const hasTeamA = player.teams.includes(fixture.teamA);
      const hasTeamB = player.teams.includes(fixture.teamB);

      if (fixture.result === "homeWin") {
        if (hasTeamA) player.points += POINTS_SYSTEM.groupWin;
        if (hasTeamB) player.points += POINTS_SYSTEM.groupLoss;
      } else if (fixture.result === "awayWin") {
        if (hasTeamA) player.points += POINTS_SYSTEM.groupLoss;
        if (hasTeamB) player.points += POINTS_SYSTEM.groupWin;
      } else if (fixture.result === "draw") {
        if (hasTeamA) player.points += POINTS_SYSTEM.groupDraw;
        if (hasTeamB) player.points += POINTS_SYSTEM.groupDraw;
      }
    });
  });

  // Add knockout bonuses
  Object.entries(sweepstake.knockoutBonuses || {}).forEach(([teamId, rounds]) => {
    players.forEach((player) => {
      if (player.teams.includes(teamId)) {
        Object.values(rounds).forEach((pts) => {
          player.points += pts;
        });
      }
    });
  });

  return players.sort((a, b) => b.points - a.points);
}

export function getTeam(id: string) {
  return TEAMS_2026.find((t) => t.id === id);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function createNewSweepstake(hostName: string, sweepstakeName: string): Sweepstake {
  const hostId = generateId();
  return {
    id: generateId(),
    name: sweepstakeName,
    hostName,
    hostId,
    status: "signup",
    players: [
      {
        id: hostId,
        name: hostName + " (Host)",
        teams: [],
        points: 0,
        joinedAt: Date.now(),
      },
    ],
    fixtures: FIXTURES,
    createdAt: Date.now(),
    knockoutBonuses: {},
  };
}

export function saveSweepstake(sw: Sweepstake): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`sw_${sw.id}`, JSON.stringify(sw));
}

export function loadSweepstake(id: string): Sweepstake | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`sw_${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function savePlayerId(swId: string, playerId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`player_${swId}`, playerId);
}

export function loadPlayerId(swId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`player_${swId}`);
}
