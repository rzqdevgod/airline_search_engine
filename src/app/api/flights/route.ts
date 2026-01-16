import { NextResponse } from "next/server";
import Amadeus from "amadeus";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate");

  if (!origin || !destination || !departureDate) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: '1',
      max: '20'
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Amadeus API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

