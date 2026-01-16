"use client";

import { useState, useMemo } from "react";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResultCard from "@/components/FlightResultCard";
import PriceGraph from "@/components/PriceGraph";
import FilterSidebar from "@/components/FilterSidebar";
import { Flight, SearchParams, FilterParams, PriceTrend } from "@/types";
import { generatePriceTrends } from "@/services/mockData";
import { searchFlights } from "@/services/api";
import { Plane, Search, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const [filters, setFilters] = useState<FilterParams>({
    maxPrice: 1000,
    stops: null,
    airlines: [],
  });

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setSearchParams(params);
    
    try {
      const results = await searchFlights(params);
      const mockTrends = generatePriceTrends(new Date(params.departureDate));
      setFlights(results);
      setPriceTrends(mockTrends);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchPrice = flight.price <= filters.maxPrice;
      const matchStops = filters.stops === null || flight.stops === filters.stops;
      const matchAirlines =
        filters.airlines.length === 0 || filters.airlines.includes(flight.airline);
      return matchPrice && matchStops && matchAirlines;
    });
  }, [flights, filters]);

  // Update price trends based on filtered results for "real-time" update feel
  const updatedPriceTrends = useMemo(() => {
    if (filteredFlights.length === 0) return priceTrends;
    // In a real app, this would be a new API call, but here we adjust mock data
    return priceTrends.map(trend => ({
      ...trend,
      price: trend.price > filters.maxPrice ? filters.maxPrice : trend.price
    }));
  }, [priceTrends, filters.maxPrice, filteredFlights]);

  const uniqueAirlines = useMemo(() => {
    return Array.from(new Set(flights.map((f) => f.airline))).sort();
  }, [flights]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Where to <span className="text-blue-500">Next?</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Search and compare flight prices from hundreds of airlines worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FlightSearchForm onSearch={handleSearch} />

        <div className="py-12">
          {!hasSearched && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-white p-8 rounded-full shadow-sm mb-6">
                <Search className="h-12 w-12 text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready for take off?</h2>
              <p className="text-slate-500 max-w-md">
                Enter your destination and travel dates to find the best flight deals.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-600 font-bold animate-pulse">Searching for best flights...</p>
            </div>
          )}

          {hasSearched && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-3">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  airlines={uniqueAirlines}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-8">
                {/* Price Graph Section */}
                <PriceGraph data={updatedPriceTrends} />

                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-800 flex items-center">
                    <Plane className="h-6 w-6 mr-2 text-blue-600" />
                    {filteredFlights.length} Flights Found
                  </h2>
                  <div className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
                    {searchParams?.origin} → {searchParams?.destination}
                  </div>
                </div>

                {/* Flight List */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredFlights.length > 0 ? (
                      filteredFlights.map((flight) => (
                        <motion.div
                          key={flight.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          layout
                        >
                          <FlightResultCard flight={flight} />
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center">
                        <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800">No flights found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your filters to see more results.</p>
                        <button 
                          onClick={() => setFilters({ maxPrice: 1500, stops: null, airlines: [] })}
                          className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-semibold text-sm">
            © 2026 FlightEngine. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
