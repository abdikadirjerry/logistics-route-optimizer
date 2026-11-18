import React from "react";
import type { FleetSpec, RouteMetrics, VehicleClass } from "../types/logistics";
import { FLEET_SPECS } from "../data/corridors";

interface FleetSummaryProps {
  vehicleClass: VehicleClass;
  onVehicleChange: (v: VehicleClass) => void;
  metrics: RouteMetrics;
}

export const FleetSummary: React.FC<FleetSummaryProps> = ({
  vehicleClass,
  onVehicleChange,
  metrics,
}) => {
  const spec: FleetSpec = FLEET_SPECS[vehicleClass];

  return (
    <section className="bg-indigo-950/35 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6 space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          FLEET TELEMETRY
        </span>
        <h2 className="text-base font-bold text-white">
          Vehicle &amp; Emissions Costing
        </h2>
      </div>

      {/* Vehicle Selector Pills */}
      <div className="space-y-2">
        {(Object.keys(FLEET_SPECS) as VehicleClass[]).map((vClass) => {
          const active = vClass === vehicleClass;
          return (
            <button
              key={vClass}
              onClick={() => onVehicleChange(vClass)}
              className={`w-full text-left px-4 py-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                active
                  ? "bg-cyan-500/15 border-cyan-400 text-white"
                  : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold">{vClass}</div>
                <div className="text-[10px] opacity-75">
                  Max {FLEET_SPECS[vClass].maxPayloadTons}t &bull;{" "}
                  {FLEET_SPECS[vClass].avgSpeedKmh} km/h
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-300">
                ${FLEET_SPECS[vClass].costPerKmUsd}/km
              </span>
            </button>
          );
        })}
      </div>

      {/* Payload Warning Banner */}
      {metrics.isOverweight && (
        <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 rounded-2xl p-3 text-xs font-semibold">
          ⚠ Payload ({metrics.totalCargoTons}t) exceeds {spec.name} limit (
          {spec.maxPayloadTons}t). Switch to a heavier vehicle class.
        </div>
      )}

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] uppercase text-slate-400 block">
            Total Distance
          </span>
          <span className="text-xl font-extrabold text-white mt-0.5 block">
            {metrics.totalDistanceKm}{" "}
            <span className="text-xs font-normal text-slate-400">km</span>
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] uppercase text-slate-400 block">
            Transit Time
          </span>
          <span className="text-xl font-extrabold text-cyan-300 mt-0.5 block">
            {metrics.estimatedHours}{" "}
            <span className="text-xs font-normal text-slate-400">hrs</span>
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] uppercase text-slate-400 block">
            Energy / Fuel Cost
          </span>
          <span className="text-xl font-extrabold text-emerald-400 mt-0.5 block">
            ${metrics.totalFuelCostUsd}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
          <span className="text-[10px] uppercase text-slate-400 block">
            CO₂ Footprint
          </span>
          <span className="text-xl font-extrabold text-rose-400 mt-0.5 block">
            {metrics.totalCo2Kg}{" "}
            <span className="text-xs font-normal text-slate-400">kg</span>
          </span>
        </div>
      </div>
    </section>
  );
};
