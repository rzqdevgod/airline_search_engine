import { Flight, PriceTrend } from "@/types";
import { addDays, format } from "date-fns";

const AIRLINES = [
  { name: "SkyLink Airways", code: "SL" },
  { name: "Oceanic Air", code: "OA" },
  { name: "Global Connect", code: "GC" },
  { name: "Horizon Jets", code: "HJ" },
  { name: "Vista Airlines", code: "VA" },
];

export const generateMockFlights = (origin: string, destination: string): Flight[] => {
  const flights: Flight[] = [];
  
  for (let i = 0; i < 20; i++) {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const departureHour = Math.floor(Math.random() * 24);
    const durationHours = 2 + Math.floor(Math.random() * 10);
    const arrivalHour = (departureHour + durationHours) % 24;
    
    flights.push({
      id: `f-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: `${airline.code}${100 + i}`,
      origin,
      destination,
      departureTime: `${departureHour.toString().padStart(2, '0')}:00`,
      arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:00`,
      duration: `${durationHours}h 00m`,
      price: 150 + Math.floor(Math.random() * 800),
      currency: "USD",
      stops: Math.floor(Math.random() * 3),
      class: 'Economy',
    });
  }
  
  return flights.sort((a, b) => a.price - b.price);
};

export const generatePriceTrends = (startDate: Date): PriceTrend[] => {
  const trends: PriceTrend[] = [];
  for (let i = -7; i <= 7; i++) {
    const date = addDays(startDate, i);
    trends.push({
      date: format(date, "MMM dd"),
      price: 200 + Math.floor(Math.random() * 400),
    });
  }
  return trends;
};

