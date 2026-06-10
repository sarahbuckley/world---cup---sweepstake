"use client";
import { useState, useEffect, use } from "react";
import {
  loadSweepstake,
  saveSweepstake,
  loadPlayerId,
  savePlayerId,
  calculatePoints,
  distributeTeams,
  getTeam,
  formatDate,
  generateId,
} from "../../../lib/utils";
import { Sweepstake, Player, Fixture } from "../../../lib/types";
import { POINTS_SYSTEM } from "../../../lib/data";

type Tab = "leaderboard" | "schedule" | "myteams" | "host";

export default function SweepstakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [sw, setSw] = useState<Sweepstake | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("leaderboard");
  const [joinName, setJoinName] = useState("");
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const data = loadSweepstake(id);
    if (!data) { setNotFound(true); return; }
    const pid = loadPlayerId(id);
    setSw(data);
    setMyId(pid);
  }, [id]);

  function save(updated: Sweepstake) {
    saveSweepstake(updated);
    setSw({ ...updated });
  }

  function handleJoin() {
    if (!sw || !joinName.trim()) return;
    const newPlayer: Player = {
      id: generateId(),
      name: joinName.trim(),
      teams: [],
      points: 0,
      joinedAt: Date.now(),
    };
    const updated = { ...sw, players: [...sw.players, newPlayer] };
    save(updated);
    savePlayerId(id, newPlayer.id);
    setMyId(newPlayer.id);
    setJoinName("");
  }

  function handleCloseSignup() {
    if (!sw) return;
    const withTeams = distributeTeams(sw.players);
    const updated = { ...sw, players: withTeams, status: "active" as const };
    save(updated);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleResultChange(fixtureId: string, field: "scoreA" | "scoreB", value: string) {
    if (!sw) return;
    const fixtures = sw.fixtures.map((f) => {
      if (f.id !== fixtureId) return f;
      return { ...f, [field]: value === "" ? undefined : parseInt(value) };
    });
    save({ ...sw, fixtures });
  }

  function handleSaveResult(fixtureId: string) {
    if (!sw) return;
    const fixtures = sw.fixtures.map((f) => {
      if (f.id !== fixtureId) return f;
      if (f.scoreA === undefined || f.scoreB === undefined) return f;
      let result: "homeWin" | "awayWin" | "draw";
      if (f.scoreA > f.scoreB) result = "homeWin";
      else if (f.scoreB > f.scoreA) result = "awayWin";
      else result = "draw";
      return { ...f, played: true, result };
    });
    const updated = { ...sw, fixtures };
    updated.players = calculatePoints(updated);
    save(updated);
  }

  function handleKnockoutBonus(teamId: string, round: string, points: number) {
    if (!sw) return;
    const bonuses = { ...sw.knockoutBonuses };
    if (!bonuses[teamId]) bonuses[teamId] = {};
    bonuses[teamId][round] = points;
    const updated = { ...sw, knockoutBonuses: bonuses };
    updated.players = calculatePoints(updated);
    save(updated);
  }

  if (notFound) return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center text-white text-center p-8">
      <div>
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold">Sweepstake not found</h1>
        <p className="text-green-300 mt-2">This link may not work in a different browser or device yet.</p>
        <a href="/" className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">Create New Sweepstake</a>
      </div>
    </div>
  );

  if (!sw) return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center text-white">Loading...</div>
  );

  const me = sw.players.find((p) => p.id === myId);
  const isHost = myId === sw.hostId;
  const ranked = [...sw.players].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white px-4 pt-8 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-green-300 text-sm font-medium uppercase tracking-wider">🏆 World Cup 2026</span>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
              sw.status === "signup" ? "bg-yellow-400 text-yellow-900" :
              sw.status === "active" ? "bg-green-400 text-green-900" : "bg-gray-400 text-gray-900"
            }`}>
              {sw.status === "signup" ? "Sign-up Open" : sw.status === "active" ? "Live" : "Complete"}
            </span>
          </div>
          <h1 className="text-2xl font-black">{sw.name}</h1>
          <p className="text-green-300 text-sm">{sw.players.length} players · Host: {sw.hostName}</p>

          {/* Join link */}
          {sw.status === "signup" && (
            <button
              onClick={handleCopyLink}
              className="mt-3 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              🔗 {copied ? "Link copied!" : "Copy invite link"}
            </button>
          )}
        </div>
      </div>

      {/* Join section - if not joined and signup open */}
      {sw.status === "signup" && !me && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            <input
              type="text"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              placeholder="Enter your name to join..."
              className="flex-1 border-2 border-yellow-300 rounded-xl px-4 py-2.5 text-gray-900 focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={handleJoin}
              disabled={!joinName.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      )}

      {me && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2">
          <div className="max-w-2xl mx-auto text-sm text-green-700 font-medium">
            👋 Playing as <strong>{me.name}</strong>
            {sw.status === "active" && <span className="ml-2 text-green-600">· {me.teams.length} teams · {me.points} pts</span>}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex">
          {(["leaderboard", "schedule", "myteams"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
                tab === t ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "leaderboard" ? "🏅 Leaderboard" : t === "schedule" ? "📅 Schedule" : "⚽ My Teams"}
            </button>
          ))}
          {isHost && (
            <button
              onClick={() => setTab("host")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
                tab === "host" ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ⚙️ Host
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* LEADERBOARD */}
        {tab === "leaderboard" && (
          <div className="space-y-3">
            {sw.status === "signup" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
                <p className="text-yellow-800 font-medium">Waiting for host to close sign-up and draw teams</p>
                <p className="text-yellow-600 text-sm mt-1">{sw.players.length} players signed up so far</p>
              </div>
            )}
            {ranked.map((player, i) => (
              <div key={player.id} className={`bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border ${player.id === myId ? "border-green-300 bg-green-50" : "border-gray-100"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                  i === 0 ? "bg-yellow-400 text-yellow-900" :
                  i === 1 ? "bg-gray-300 text-gray-700" :
                  i === 2 ? "bg-orange-300 text-orange-900" : "bg-gray-100 text-gray-500"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 truncate">{player.name} {player.id === myId && <span className="text-green-600 text-sm">(you)</span>}</div>
                  {sw.status === "active" && (
                    <div className="text-sm text-gray-500 flex flex-wrap gap-1 mt-0.5">
                      {player.teams.map((tid) => {
                        const t = getTeam(tid);
                        return t ? <span key={tid}>{t.flag} {t.name}</span> : null;
                      }).reduce((acc: React.ReactNode[], item, idx, arr) => {
                        if (idx < arr.length - 1) return [...acc, item, <span key={`sep-${idx}`} className="text-gray-300">·</span>];
                        return [...acc, item];
                      }, [])}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-green-700">{player.points}</div>
                  <div className="text-xs text-gray-400">pts</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && (
          <div className="space-y-2">
            {sw.fixtures.map((fixture) => {
              const teamA = getTeam(fixture.teamA);
              const teamB = getTeam(fixture.teamB);
              if (!teamA || !teamB) return null;
              const myTeams = me?.teams || [];
              const isMine = myTeams.includes(fixture.teamA) || myTeams.includes(fixture.teamB);
              return (
                <div key={fixture.id} className={`bg-white rounded-2xl p-4 shadow-sm border ${isMine ? "border-green-300" : "border-gray-100"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{fixture.stage}</span>
                    <span className="text-xs text-gray-400">{formatDate(fixture.date)} · {fixture.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-2xl">{teamA.flag}</span>
                      <span className="font-bold text-gray-900 text-sm">{teamA.name}</span>
                    </div>
                    <div className="text-center px-3">
                      {fixture.played ? (
                        <span className="font-black text-lg text-gray-900">{fixture.scoreA} – {fixture.scoreB}</span>
                      ) : (
                        <span className="text-gray-400 font-medium text-sm">vs</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="font-bold text-gray-900 text-sm">{teamB.name}</span>
                      <span className="text-2xl">{teamB.flag}</span>
                    </div>
                  </div>
                  {isMine && (
                    <div className="mt-2 text-xs text-green-600 font-semibold">⚽ Your team is playing!</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">📍 {fixture.venue}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* MY TEAMS */}
        {tab === "myteams" && (
          <div>
            {!me ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-3">👆</div>
                <p className="font-medium">Join the sweepstake to see your teams</p>
              </div>
            ) : sw.status === "signup" ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-3">⏳</div>
                <p className="font-medium">Teams will be drawn when the host closes sign-up</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-600 text-white rounded-2xl p-5 text-center">
                  <div className="text-4xl font-black">{me.points}</div>
                  <div className="text-green-200 text-sm">Total Points</div>
                </div>

                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Your Teams</h3>
                <div className="grid grid-cols-2 gap-3">
                  {me.teams.map((tid) => {
                    const team = getTeam(tid);
                    if (!team) return null;
                    const myFixtures = sw.fixtures.filter(
                      (f) => f.teamA === tid || f.teamB === tid
                    );
                    const wins = myFixtures.filter(
                      (f) => f.played && ((f.teamA === tid && f.result === "homeWin") || (f.teamB === tid && f.result === "awayWin"))
                    ).length;
                    const draws = myFixtures.filter((f) => f.played && f.result === "draw").length;
                    return (
                      <div key={tid} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <div className="text-3xl mb-1">{team.flag}</div>
                        <div className="font-bold text-gray-900">{team.name}</div>
                        <div className="text-xs text-gray-500 mt-1">Group {team.group}</div>
                        {myFixtures.some(f => f.played) && (
                          <div className="text-xs text-green-600 font-medium mt-1">{wins}W {draws}D</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mt-4">Upcoming Matches</h3>
                {sw.fixtures
                  .filter((f) => !f.played && (me.teams.includes(f.teamA) || me.teams.includes(f.teamB)))
                  .slice(0, 5)
                  .map((f) => {
                    const tA = getTeam(f.teamA);
                    const tB = getTeam(f.teamB);
                    if (!tA || !tB) return null;
                    return (
                      <div key={f.id} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between shadow-sm">
                        <span className="text-sm font-medium text-gray-700">{tA.flag} {tA.name} vs {tB.flag} {tB.name}</span>
                        <span className="text-xs text-gray-400">{formatDate(f.date)}</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* HOST PANEL */}
        {tab === "host" && isHost && (
          <div className="space-y-6">
            {/* Sign-up management */}
            {sw.status === "signup" && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Sign-up Phase</h3>
                <p className="text-sm text-gray-500 mb-4">{sw.players.length} players have joined. When everyone is in, close sign-up to randomly draw teams.</p>
                <div className="space-y-2 mb-4">
                  {sw.players.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <span>👤</span> {p.name}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCloseSignup}
                  disabled={sw.players.length < 2}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  🎲 Close Sign-up & Draw Teams
                </button>
                {sw.players.length < 2 && <p className="text-xs text-center text-gray-400 mt-2">Need at least 2 players</p>}
              </div>
            )}

            {/* Results entry */}
            {sw.status === "active" && (
              <>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-1">Enter Results</h3>
                  <p className="text-sm text-gray-500 mb-4">Enter the score for each match and save to update the leaderboard.</p>
                  <div className="space-y-3">
                    {sw.fixtures.map((fixture) => {
                      const tA = getTeam(fixture.teamA);
                      const tB = getTeam(fixture.teamB);
                      if (!tA || !tB) return null;
                      return (
                        <div key={fixture.id} className={`p-3 rounded-xl border ${fixture.played ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                          <div className="text-xs text-gray-500 mb-2">{fixture.stage} · {formatDate(fixture.date)}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium flex-1 text-right">{tA.flag} {tA.name}</span>
                            <input
                              type="number"
                              min={0}
                              value={fixture.scoreA ?? ""}
                              onChange={(e) => handleResultChange(fixture.id, "scoreA", e.target.value)}
                              className="w-12 text-center border-2 border-gray-300 rounded-lg py-1 font-bold text-lg focus:border-green-500 focus:outline-none"
                            />
                            <span className="text-gray-400 font-bold">–</span>
                            <input
                              type="number"
                              min={0}
                              value={fixture.scoreB ?? ""}
                              onChange={(e) => handleResultChange(fixture.id, "scoreB", e.target.value)}
                              className="w-12 text-center border-2 border-gray-300 rounded-lg py-1 font-bold text-lg focus:border-green-500 focus:outline-none"
                            />
                            <span className="text-sm font-medium flex-1">{tB.flag} {tB.name}</span>
                            <button
                              onClick={() => handleSaveResult(fixture.id)}
                              disabled={fixture.scoreA === undefined || fixture.scoreB === undefined}
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              {fixture.played ? "✓" : "Save"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Knockout bonuses */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-1">Knockout Bonuses</h3>
                  <p className="text-sm text-gray-500 mb-4">Award bonus points when teams progress through the knockout stages.</p>
                  <div className="space-y-2">
                    {[
                      { key: "roundOf16", label: "Round of 16", pts: POINTS_SYSTEM.roundOf16 },
                      { key: "quarterFinal", label: "Quarter Final", pts: POINTS_SYSTEM.quarterFinal },
                      { key: "semiFinal", label: "Semi Final", pts: POINTS_SYSTEM.semiFinal },
                      { key: "runnerUp", label: "Runner Up", pts: POINTS_SYSTEM.runnerUp },
                      { key: "winner", label: "🏆 Winner", pts: POINTS_SYSTEM.winner },
                    ].map(({ key, label, pts }) => (
                      <div key={key}>
                        <div className="text-sm font-semibold text-gray-700 mb-1">{label} (+{pts} pts)</div>
                        <div className="flex flex-wrap gap-2">
                          {sw.players.flatMap(p => p.teams).filter((v, i, a) => a.indexOf(v) === i).map((teamId) => {
                            const team = getTeam(teamId);
                            const awarded = sw.knockoutBonuses?.[teamId]?.[key] !== undefined;
                            return (
                              <button
                                key={teamId}
                                onClick={() => !awarded && handleKnockoutBonus(teamId, key, pts)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${awarded ? "bg-green-100 text-green-700 cursor-default" : "bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700"}`}
                              >
                                {team?.flag} {team?.name} {awarded && "✓"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Points reference */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Points System</h3>
              <div className="space-y-1 text-sm">
                {[
                  ["Win", POINTS_SYSTEM.groupWin],
                  ["Draw", POINTS_SYSTEM.groupDraw],
                  ["Loss", POINTS_SYSTEM.groupLoss],
                  ["Reach Round of 16", POINTS_SYSTEM.roundOf16],
                  ["Quarter Final", POINTS_SYSTEM.quarterFinal],
                  ["Semi Final", POINTS_SYSTEM.semiFinal],
                  ["Runner Up", POINTS_SYSTEM.runnerUp],
                  ["Winner 🏆", POINTS_SYSTEM.winner],
                ].map(([label, pts]) => (
                  <div key={label} className="flex justify-between text-gray-600">
                    <span>{label}</span>
                    <span className="font-bold text-green-700">{pts} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
