import React, { useState, useMemo } from "react";
import { FLEET_SPECS, INITIAL_HUBS } from "./data/corridors";
import type { RouteHub, VehicleClass } from "./types/logistics";
import {
  computeRouteMetrics,
  optimizeNearestNeighbor,
} from "./utils/routeCalc";
import { WaypointQueue } from "./components/WaypointQueue";
import { RouteMap } from "./components/RouteMap";
import { FleetSummary } from "./components/FleetSummary";

export function App() {
  const [hubs, setHubs] = useState<RouteHub[]>(INITIAL_HUBS);
  const [vehicleClass, setVehicleClass] =
    useState<VehicleClass>("Hybrid Box Truck");

  const metrics = useMemo(
    () => computeRouteMetrics(hubs, FLEET_SPECS[vehicleClass]),
    [hubs, vehicleClass],
  );

  const handleMoveHub = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= hubs.length) return;
    const updated = [...hubs];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    setHubs(updated);
  };

  const handleRemoveHub = (id: string) => {
    setHubs((prev) => prev.filter((h) => h.id !== id));
  };

  const handleAddHub = (newHub: Omit<RouteHub, "id">) => {
    setHubs((prev) => [...prev, { id: `hub-${Date.now()}`, ...newHub }]);
  };

  const handleOptimize = () => {
    setHubs((prev) => optimizeNearestNeighbor(prev));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* Floating Pill Top Navigation */}
      <header className="px-6 pt-5 pb-2 max-w-[1440px] w-full mx-auto">
        <div className="bg-indigo-950/50 backdrop-blur-md border border-indigo-500/25 rounded-full px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h1 className="text-sm font-extrabold tracking-wide text-white">
              MERIDIAN FREIGHT // CORRIDOR ROUTE OPTIMIZER
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span>
              Total Manifest:{" "}
              <strong className="text-white">
                {metrics.totalCargoTons} Tons
              </strong>
            </span>
            <span className="hidden sm:inline text-indigo-400">|</span>
            <span className="hidden sm:inline text-cyan-300 font-semibold">
              REACT + TYPESCRIPT + GLASSMORPHIC UI
            </span>
          </div>
        </div>
      </header>

      {/* 3-Column Command Workspace */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <WaypointQueue
            hubs={hubs}
            onMoveHub={handleMoveHub}
            onRemoveHub={handleRemoveHub}
            onAddHub={handleAddHub}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <RouteMap hubs={hubs} onOptimize={handleOptimize} />
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <FleetSummary
            vehicleClass={vehicleClass}
            onVehicleChange={setVehicleClass}
            metrics={metrics}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
