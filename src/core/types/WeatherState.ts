export interface WeatherState {
    loading: boolean;
    error: string | null;
    city: string | null;
    coordLat: string |null;
    coordLon: string |null;
    weather: string |null;
    wind: string |null;
    temperature: number | null;
  }