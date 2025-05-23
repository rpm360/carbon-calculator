// City to country mapping with average carbon footprint data
interface CityData {
  country: string;
  averageFootprint: number; // kg CO2e per day
}

// Map of cities to their country and average carbon footprint
export const cityToCountryMap: Record<string, CityData> = {
  // United States
  'New York': { country: 'United States', averageFootprint: 18.5 },
  'Los Angeles': { country: 'United States', averageFootprint: 20.3 },
  'Chicago': { country: 'United States', averageFootprint: 19.2 },
  'Houston': { country: 'United States', averageFootprint: 22.7 },
  'Phoenix': { country: 'United States', averageFootprint: 21.5 },
  'Philadelphia': { country: 'United States', averageFootprint: 17.8 },
  'San Antonio': { country: 'United States', averageFootprint: 21.9 },
  'San Diego': { country: 'United States', averageFootprint: 18.6 },
  'Dallas': { country: 'United States', averageFootprint: 22.1 },
  'San Jose': { country: 'United States', averageFootprint: 17.4 },
  'Austin': { country: 'United States', averageFootprint: 19.8 },
  'Boston': { country: 'United States', averageFootprint: 16.9 },
  'Seattle': { country: 'United States', averageFootprint: 15.7 },
  'Denver': { country: 'United States', averageFootprint: 18.3 },
  'Miami': { country: 'United States', averageFootprint: 19.5 },
  
  // Canada
  'Toronto': { country: 'Canada', averageFootprint: 16.2 },
  'Montreal': { country: 'Canada', averageFootprint: 15.5 },
  'Vancouver': { country: 'Canada', averageFootprint: 14.8 },
  'Calgary': { country: 'Canada', averageFootprint: 18.7 },
  'Ottawa': { country: 'Canada', averageFootprint: 15.9 },
  
  // United Kingdom
  'London': { country: 'United Kingdom', averageFootprint: 12.5 },
  'Manchester': { country: 'United Kingdom', averageFootprint: 11.8 },
  'Birmingham': { country: 'United Kingdom', averageFootprint: 12.1 },
  'Glasgow': { country: 'United Kingdom', averageFootprint: 11.5 },
  'Liverpool': { country: 'United Kingdom', averageFootprint: 11.9 },
  
  // Australia
  'Sydney': { country: 'Australia', averageFootprint: 17.5 },
  'Melbourne': { country: 'Australia', averageFootprint: 16.9 },
  'Brisbane': { country: 'Australia', averageFootprint: 18.2 },
  'Perth': { country: 'Australia', averageFootprint: 19.1 },
  'Adelaide': { country: 'Australia', averageFootprint: 17.3 },
  
  // Germany
  'Berlin': { country: 'Germany', averageFootprint: 10.8 },
  'Munich': { country: 'Germany', averageFootprint: 11.2 },
  'Hamburg': { country: 'Germany', averageFootprint: 11.5 },
  'Frankfurt': { country: 'Germany', averageFootprint: 12.1 },
  'Cologne': { country: 'Germany', averageFootprint: 11.7 },
  
  // France
  'Paris': { country: 'France', averageFootprint: 10.2 },
  'Marseille': { country: 'France', averageFootprint: 10.8 },
  'Lyon': { country: 'France', averageFootprint: 10.5 },
  'Toulouse': { country: 'France', averageFootprint: 10.3 },
  'Nice': { country: 'France', averageFootprint: 10.7 },
  
  // Japan
  'Tokyo': { country: 'Japan', averageFootprint: 9.8 },
  'Osaka': { country: 'Japan', averageFootprint: 10.1 },
  'Kyoto': { country: 'Japan', averageFootprint: 9.5 },
  'Yokohama': { country: 'Japan', averageFootprint: 9.9 },
  'Nagoya': { country: 'Japan', averageFootprint: 10.3 },
  
  // India
  'Mumbai': { country: 'India', averageFootprint: 7.2 },
  'Delhi': { country: 'India', averageFootprint: 7.8 },
  'Bangalore': { country: 'India', averageFootprint: 6.9 },
  'Hyderabad': { country: 'India', averageFootprint: 7.1 },
  'Chennai': { country: 'India', averageFootprint: 7.4 },
};

// Country average carbon footprints (kg CO2e per day)
export const countryAverages: Record<string, number> = {
  'United States': 19.5,
  'Canada': 16.2,
  'United Kingdom': 12.1,
  'Australia': 17.8,
  'Germany': 11.4,
  'France': 10.5,
  'Japan': 9.9,
  'India': 7.3,
  'China': 8.5,
  'Brazil': 9.2,
  'Russia': 14.8,
  'South Africa': 13.2,
  'Mexico': 10.8,
  'Italy': 10.2,
  'Spain': 9.8,
  'South Korea': 12.7,
  'Netherlands': 11.9,
  'Sweden': 8.9,
  'Switzerland': 9.1,
  'Norway': 10.3
};

// Global average (kg CO2e per day)
export const globalAverage = 12.7;

// Get city data or return default values
export const getCityData = (city: string): CityData => {
  const normalizedCity = city.trim();
  return cityToCountryMap[normalizedCity] || { 
    country: '', 
    averageFootprint: globalAverage 
  };
};

// Get country average or return global average
export const getCountryAverage = (country: string): number => {
  return countryAverages[country] || globalAverage;
};

// Get suggestions for city autocomplete
export const getCitySuggestions = (input: string): string[] => {
  if (!input || input.length < 2) return [];
  
  const normalizedInput = input.toLowerCase().trim();
  return Object.keys(cityToCountryMap)
    .filter(city => city.toLowerCase().includes(normalizedInput))
    .slice(0, 5); // Limit to 5 suggestions
};
