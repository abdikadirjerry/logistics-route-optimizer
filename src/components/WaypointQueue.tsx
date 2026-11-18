import React, { useState } from "react";
import type { RouteHub } from "../types/logistics";

interface WaypointQueueProps {
  hubs: RouteHub[];
  onMoveHub: (index: number, direction: -1 | 1) => void;
  onRemoveHub: (id: string) => void;
  onAddHub: (hub: Omit<RouteHub, "id">) => void;
}

export const WaypointQueue: React.FC<WaypointQueueProps> = ({
  hubs,
  onMoveHub,
  onRemoveHub,
  onAddHub,
}) => {
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [cargoTons, setCargoTons] = useState("2.5");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !code.trim()) return;
    onAddHub({
      city: city.trim(),
      code: code.trim().toUpperCase().slice(0, 3),
      x: Math.floor(15 + Math.random() * 70),
      y: Math.floor(15 + Math.random() * 70),
      cargoTons: Math.max(0.5, parseFloat(cargoTons) || 2.0),
      status: "Scheduled",
    });
    setCity("");
    setCode("");
  };

  return (
    <section className="bg-indigo-950/35 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6 space-y-5 flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
            DISPATCH MANIFEST
          </span>
          <h2 className="text-base font-bold text-white">
            Ordered Stop Sequence
          </h2>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {hubs.map((hub, idx) => (
            <div
              key={hub.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    #{idx + 1} {hub.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {hub.cargoTons}t cargo
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-100 truncate mt-1">
                  {hub.city}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  disabled={idx === 0}
                  onClick={() => onMoveHub(idx, -1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-slate-200 cursor-pointer"
                  title="Move earlier"
                >
                  ↑
                </button>
                <button
                  disabled={idx === hubs.length - 1}
                  onClick={() => onMoveHub(idx, 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-slate-200 cursor-pointer"
                  title="Move later"
                >
                  ↓
                </button>
                {hubs.length > 2 && (
                  <button
                    onClick={() => onRemoveHub(hub.id)}
                    className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs cursor-pointer"
                    title="Remove stop"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Waypoint Form */}
      <form
        onSubmit={handleAdd}
        className="pt-4 border-t border-indigo-500/20 space-y-2.5"
      >
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            maxLength={3}
            required
            placeholder="IATA (e.g. BRB)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-cyan-400"
          />
          <input
            type="text"
            required
            placeholder="Hub city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="15"
            value={cargoTons}
            onChange={(e) => setCargoTons(e.target.value)}
            className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer"
          >
            + Append Waypoint
          </button>
        </div>
      </form>
    </section>
  );
};
