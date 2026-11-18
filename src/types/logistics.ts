export type VehicleClass =
  | "Electric Van"
  | "Heavy Diesel Semi"
  | "Hybrid Box Truck";

export interface RouteHub {
  id: string;
  code: string;
  city: string;
  x: number; // SVG coordinate (0-100)
  y: number; // SVG coordinate (0-100)
  cargoTons: number;
  status: "Dispatched" | "In Transit" | "Scheduled";
}

export interface FleetSpec {
  name: VehicleClass;
  avgSpeedKmh: number;
  costPerKmUsd: number;
  co2KgPerKm: number;
  maxPayloadTons: number;
}

export interface RouteMetrics {
  totalDistanceKm: number;
  estimatedHours: number;
  totalFuelCostUsd: number;
  totalCo2Kg: number;
  totalCargoTons: number;
  isOverweight: boolean;
}
