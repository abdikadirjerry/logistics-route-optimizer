import React from "react";
import type { RouteHub } from "../types/logistics";
import { legDistanceKm } from "../utils/routeCalc";

interface RouteMapProps {
  hubs: RouteHub[];
  onOptimize: () => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({ hubs, onOptimize }) => {
  return (
    <section className="bg-indigo-950/35 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            LIVE TELEMETRY RADAR
          </span>
          <h2 className="text-base font-bold text-white">
            Corridor Waypoint Topology
          </h2>
        </div>

        <button
          onClick={onOptimize}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-full transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          ⚡ Auto-Optimize Sequence
        </button>
      </div>

      {/* SVG Radar Canvas */}
      <div className="relative w-full aspect-[16/11] bg-[#070b14] rounded-2xl border border-indigo-500/20 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Subtle Coordinate Grid */}
          {[20, 40, 60, 80].map((pos) => (
            <g key={pos} stroke="#1e293b" strokeWidth="0.3">
              <line x1={pos} y1="0" x2={pos} y2="100" />
              <line x1="0" y1={pos} x2="100" y2={pos} />
            </g>
          ))}

          {/* Route Segments */}
          {hubs.map((hub, idx) => {
            if (idx === hubs.length - 1) return null;
            const next = hubs[idx + 1];
            const dist = legDistanceKm(hub, next);
            const midX = (hub.x + next.x) / 2;
            const midY = (hub.y + next.y) / 2;

            return (
              <g key={`${hub.id}-${next.id}`}>
                <line
                  x1={hub.x}
                  y1={hub.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="#06b6d4"
                  strokeWidth="0.9"
                  strokeDasharray="2 1.2"
                />
                <rect
                  x={midX - 6.5}
                  y={midY - 2.6}
                  width="13"
                  height="5"
                  rx="1.5"
                  fill="#0f172a"
                  stroke="#06b6d4"
                  strokeWidth="0.3"
                />
                <text
                  x={midX}
                  y={midY + 0.8}
                  textAnchor="middle"
                  fill="#67e8f9"
                  fontSize="2.4"
                  fontWeight="bold"
                >
                  {dist}km
                </text>
              </g>
            );
          })}

          {/* Waypoint Nodes */}
          {hubs.map((hub, idx) => (
            <g key={hub.id}>
              <circle
                cx={hub.x}
                cy={hub.y}
                r="3.2"
                fill={idx === 0 ? "#f43f5e" : "#06b6d4"}
                fillOpacity="0.25"
              />
              <circle
                cx={hub.x}
                cy={hub.y}
                r="1.7"
                fill={idx === 0 ? "#f43f5e" : "#22d3ee"}
              />
              <text
                x={hub.x}
                y={hub.y - 3.6}
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="3"
                fontWeight="bold"
              >
                {idx + 1}. {hub.code}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>
          Origin Hub:{" "}
          <strong className="text-rose-400">{hubs[0]?.code ?? "N/A"}</strong>
        </span>
        <span>
          Active Waypoints:{" "}
          <strong className="text-cyan-300">{hubs.length} Stops</strong>
        </span>
      </div>
    </section>
  );
};
