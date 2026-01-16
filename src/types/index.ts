export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  class: 'Economy' | 'Premium' | 'Business' | 'First';
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

export interface FilterParams {
  maxPrice: number;
  stops: number | null;
  airlines: string[];
}

export interface PriceTrend {
  date: string;
  price: number;
}

