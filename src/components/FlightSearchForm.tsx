"use client";

import { useState } from "react";
import { Search, PlaneTakeoff, PlaneLanding, Calendar, Users } from "lucide-react";
import { SearchParams } from "@/types";

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [params, setParams] = useState<SearchParams>({
    origin: "NYC",
    destination: "LON",
    departureDate: new Date().toISOString().split("T")[0],
    passengers: 1,
    cabinClass: "Economy",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 -mt-12 relative z-10 max-w-6xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">From</label>
          <div className="relative">
            <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={params.origin}
              onChange={(e) => setParams({ ...params, origin: e.target.value.toUpperCase() })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Origin (JFK)"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">To</label>
          <div className="relative">
            <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={params.destination}
              onChange={(e) => setParams({ ...params, destination: e.target.value.toUpperCase() })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Destination (LHR)"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="date"
              value={params.departureDate}
              onChange={(e) => setParams({ ...params, departureDate: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              value={params.passengers}
              onChange={(e) => setParams({ ...params, passengers: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <Search className="h-5 w-5" />
            <span>Search Flights</span>
          </button>
        </div>
      </div>
    </form>
  );
}

