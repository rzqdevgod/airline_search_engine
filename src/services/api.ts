import { Flight, SearchParams } from "@/types";
import { generateMockFlights } from "./mockData";

export async function searchFlights(params: SearchParams): Promise<Flight[]> {
  try {
    const query = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      departureDate: params.departureDate,
    }).toString();

    const response = await fetch(`/api/flights?${query}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch flights from API");
    }

    const data = await response.json();
    
    // Map Amadeus data to our Flight type
    // This is a simplified mapping for the demo
    return data.map((offer: any) => ({
      id: offer.id,
      airline: offer.itineraries[0].segments[0].carrierCode, // Real app would map code to name
      airlineCode: offer.itineraries[0].segments[0].carrierCode,
      flightNumber: `${offer.itineraries[0].segments[0].carrierCode}${offer.itineraries[0].segments[0].number}`,
      origin: params.origin,
      destination: params.destination,
      departureTime: offer.itineraries[0].segments[0].departure.at.split('T')[1].substring(0, 5),
      arrivalTime: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at.split('T')[1].substring(0, 5),
      duration: offer.itineraries[0].duration.substring(2).toLowerCase(),
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      stops: offer.itineraries[0].segments.length - 1,
      class: 'Economy',
    }));
  } catch (error) {
    console.warn("Using mock data because:", error);
    return generateMockFlights(params.origin, params.destination);
  }
}

