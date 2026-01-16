"use client";

import { FilterParams } from "@/types";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  airlines: string[];
}

export default function FilterSidebar({ filters, onFilterChange, airlines }: FilterSidebarProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  const handleStopChange = (stops: number | null) => {
    onFilterChange({ ...filters, stops });
  };

  const toggleAirline = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    onFilterChange({ ...filters, airlines: newAirlines });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-600" />
          Filters
        </h3>
        <button 
          onClick={() => onFilterChange({ maxPrice: 1000, stops: null, airlines: [] })}
          className="text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          Reset All
        </button>
      </div>

      {/* Stops Filter */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Stops</h4>
        <div className="space-y-2">
          {[null, 0, 1, 2].map((s) => (
            <label key={s === null ? 'any' : s} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="stops"
                checked={filters.stops === s}
                onChange={() => handleStopChange(s)}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${
                filters.stops === s ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-slate-300'
              }`}>
                {filters.stops === s && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className={`text-sm font-semibold ${filters.stops === s ? 'text-slate-900' : 'text-slate-500'}`}>
                {s === null ? 'Any number of stops' : s === 0 ? 'Non-stop only' : `${s} stop${s > 1 ? 's' : ''}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Max Price</h4>
          <span className="text-sm font-black text-blue-600">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="1500"
          step="50"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-400">
          <span>$100</span>
          <span>$1,500+</span>
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Airlines</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${
                filters.airlines.includes(airline) ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-slate-300'
              }`}>
                {filters.airlines.includes(airline) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm font-semibold ${filters.airlines.includes(airline) ? 'text-slate-900' : 'text-slate-500'}`}>
                {airline}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

