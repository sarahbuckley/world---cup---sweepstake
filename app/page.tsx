"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewSweepstake, saveSweepstake, savePlayerId } from "../lib/utils";

export default function Home() {
  const router = useRouter();
  const [hostName, setHostName] = useState("");
  const [sweepstakeName, setSweepstakeName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    if (!hostName.trim() || !sweepstakeName.trim()) return;
    setLoading(true);
    const sw = createNewSweepstake(hostName.trim(), sweepstakeName.trim());
    saveSweepstake(sw);
    savePlayerId(sw.id, sw.hostId);
    router.push(`/sweepstake/${sw.id}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-4xl font-black text-white tracking-tight">World Cup 2026</h1>
          <p className="text-green-300 text-lg mt-1 font-medium">Sweepstake Manager</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a Sweepstake</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Sarah"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Sweepstake Name</label>
              <input
                type="text"
                value={sweepstakeName}
                onChange={(e) => setSweepstakeName(e.target.value)}
                placeholder="e.g. Office World Cup 2026"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none text-base"
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={!hostName.trim() || !sweepstakeName.trim() || loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors mt-2"
            >
              {loading ? "Creating..." : "Create Sweepstake →"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            You'll get a shareable link to send to your players
          </p>
        </div>
        <p className="text-center text-green-400 text-sm mt-6">
          48 teams · 104 matches · USA, Canada & Mexico 🌎
        </p>
      </div>
    </div>
  );
}