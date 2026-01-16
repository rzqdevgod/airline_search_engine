"use client";

import { Flight } from "@/types";
import { Plane, Clock, ShieldCheck } from "lucide-react";

interface FlightResultCardProps {
  flight: Flight;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Airline Info */}
        <div className="flex items-center space-x-4 min-w-[180px]">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
            <Plane className="h-6 w-6 text-blue-600 -rotate-45" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{flight.airline}</h4>
            <p className="text-xs text-slate-500 font-medium">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Flight Path */}
        <div className="flex-1 flex items-center justify-between max-w-md mx-auto w-full">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-800">{flight.departureTime}</div>
            <div className="text-sm font-semibold text-slate-500">{flight.origin}</div>
          </div>

          <div className="flex-1 px-4 flex flex-col items-center">
            <div className="text-xs font-medium text-slate-400 mb-1">{flight.duration}</div>
            <div className="w-full h-0.5 bg-slate-100 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <div className={`h-2 w-2 rounded-full ${flight.stops === 0 ? 'bg-green-500' : 'bg-orange-400'}`}></div>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold text-slate-800">{flight.arrivalTime}</div>
            <div className="text-sm font-semibold text-slate-500">{flight.destination}</div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 min-w-[120px]">
          <div className="text-2xl font-black text-slate-800">
            <span className="text-sm font-bold text-slate-500 mr-1">$</span>
            {flight.price}
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors">
            Select
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs font-semibold text-green-600">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Flexible Ticket
          </div>
          <div className="flex items-center text-xs font-semibold text-slate-500">
            <Clock className="h-3 w-3 mr-1" />
            Price likely to rise
          </div>
        </div>
        <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">
          View details
        </div>
      </div>
    </div>
  );
}

