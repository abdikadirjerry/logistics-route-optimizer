import type { FleetSpec, RouteHub, RouteMetrics } from "../types/logistics";

const KM_SCALE_FACTOR = 8.5;

export function legDistanceKm(a: RouteHub, b: RouteHub): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.round(Math.sqrt(dx * dx + dy * dy) * KM_SCALE_FACTOR);
}

export function computeRouteMetrics(
  hubs: RouteHub[],
  spec: FleetSpec,
): RouteMetrics {
  let totalDistanceKm = 0;
  for (let i = 0; i < hubs.length - 1; i++) {
    totalDistanceKm += legDistanceKm(hubs[i], hubs[i + 1]);
  }

  const totalCargoTons =
    Math.round(hubs.reduce((sum, h) => sum + h.cargoTons, 0) * 10) / 10;

  return {
    totalDistanceKm,
    estimatedHours: Math.round((totalDistanceKm / spec.avgSpeedKmh) * 10) / 10,
    totalFuelCostUsd: Math.round(totalDistanceKm * spec.costPerKmUsd),
    totalCo2Kg: Math.round(totalDistanceKm * spec.co2KgPerKm),
    totalCargoTons,
    isOverweight: totalCargoTons > spec.maxPayloadTons,
  };
}

export function optimizeNearestNeighbor(hubs: RouteHub[]): RouteHub[] {
  if (hubs.length <= 2) return hubs;
  const remaining = [...hubs];
  const ordered: RouteHub[] = [remaining.shift()!];

  while (remaining.length > 0) {
    const current = ordered[ordered.length - 1];
    let bestIdx = 0;
    let bestDist = Infinity;

    remaining.forEach((candidate, idx) => {
      const dist = legDistanceKm(current, candidate);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    ordered.push(remaining.splice(bestIdx, 1)[0]);
  }

  return ordered;
}
