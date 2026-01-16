declare module 'amadeus' {
    interface AmadeusConfig {
      clientId?: string;
      clientSecret?: string;
      hostname?: string;
      port?: number;
      ssl?: boolean;
      customAppId?: string;
      customAppVersion?: string;
      logLevel?: string;
    }
  
    interface FlightOffersSearchParams {
      originLocationCode: string;
      destinationLocationCode: string;
      departureDate: string;
      adults?: string;
      max?: string;
      [key: string]: any;
    }
  
    interface FlightOffersResponse {
      data: any[];
      [key: string]: any;
    }
  
    interface Shopping {
      flightOffersSearch: {
        get(params: FlightOffersSearchParams): Promise<FlightOffersResponse>;
      };
    }
  
    class Amadeus {
      constructor(config: AmadeusConfig);
      shopping: Shopping;
      [key: string]: any;
    }
  
    export default Amadeus;
}