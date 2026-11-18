import type { FleetSpec, RouteHub, VehicleClass } from "../types/logistics";

export const FLEET_SPECS: Record<VehicleClass, FleetSpec> = {
  "Electric Van": {
    name: "Electric Van",
    avgSpeedKmh: 68,
    costPerKmUsd: 0.42,
    co2KgPerKm: 0.05,
    maxPayloadTons: 4.5,
  },
  "Hybrid Box Truck": {
    name: "Hybrid Box Truck",
    avgSpeedKmh: 62,
    costPerKmUsd: 0.85,
    co2KgPerKm: 0.38,
    maxPayloadTons: 12.0,
  },
  "Heavy Diesel Semi": {
    name: "Heavy Diesel Semi",
    avgSpeedKmh: 55,
    costPerKmUsd: 1.35,
    co2KgPerKm: 0.89,
    maxPayloadTons: 28.0,
  },
};

export const INITIAL_HUBS: RouteHub[] = [
  {
    id: "hub-1",
    code: "BBO",
    city: "Berbera Port Terminal",
    x: 68,
    y: 22,
    cargoTons: 6.4,
    status: "Dispatched",
  },
  {
    id: "hub-2",
    code: "HGA",
    city: "Hargeisa Logistics Hub",
    x: 48,
    y: 42,
    cargoTons: 4.2,
    status: "In Transit",
  },
  {
    id: "hub-3",
    code: "JIB",
    city: "Djibouti Free Zone",
    x: 34,
    y: 18,
    cargoTons: 3.1,
    status: "Scheduled",
  },
  {
    id: "hub-4",
    code: "ADD",
    city: "Addis Dry Port",
    x: 18,
    y: 74,
    cargoTons: 5.8,
    status: "Scheduled",
  },
];
