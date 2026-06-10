import { Player, Sweepstake } from "./types";
import { TEAMS_2026, POINTS_SYSTEM, FIXTURES } from "./data";

const SUPABASE_URL = "https://amcwesgzsyvhzdnkulbq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY3dlc2d6c3l2aHpkbmt1bGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDcyNzMsImV4cCI6MjA5NjY4MzI3M30.7UduBMyK4QzLVL6m-s4iDphpkjAFjaW0GZx_VT8uwQQ";

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

  Object.entries(sweepstake.knockoutBonuses || {}).forEach(([teamId, rounds]) => {
    players.forEach((player) => {
      if (player.teams.includes(teamId)) {
        Object.values(rounds).forEach((pts) => { player.points += pts; });
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
    players: [{ id: hostId, name: hostName + " (Host)", teams: [], points: 0, joinedAt: Date.now() }],
    fixtures: FIXTURES,
    createdAt: Date.now(),
    knockoutBonuses: {},
  };
}

export async function saveSweepstake(sw: Sweepstake): Promise<void> {
  const data = JSON.stringify(sw);
  // Check if exists
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/sweepstakes?sw_id=eq.${sw.id}&select=id`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const existing = await checkRes.json();

  if (existing && existing.length > 0) {
    await fetch(`${SUPABASE_URL}/rest/v1/sweepstakes?sw_id=eq.${sw.id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  } else {
    await fetch(`${SUPABASE_URL}/rest/v1/sweepstakes`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sw_id: sw.id, data }),
    });
  }

  // Also save to localStorage as cache
  if (typeof window !== "undefined") {
    localStorage.setItem(`sw_${sw.id}`, JSON.stringify(sw));
  }
}

export async function loadSweepstake(id: string): Promise<Sweepstake | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/sweepstakes?sw_id=eq.${id}&select=data`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const rows = await res.json();
    if (rows && rows.length > 0) {
      return JSON.parse(rows[0].data);
    }
  } catch {}
  return null;
}

export function savePlayerId(swId: string, playerId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`player_${swId}`, playerId);
}

export function loadPlayerId(swId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`player_${swId}`);
}
