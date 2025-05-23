import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our activities
export type ActivityType = 'driving' | 'ai_usage' | 'commute' | 'phone' | 'electricity' | 'food';

export interface CarbonActivity {
  id: string;
  type: ActivityType;
  value: number;
  unit: string;
  timestamp: Date;
}

export interface User {
  email: string;
  city: string;
  country?: string;
}

// Define the shape of our context
interface CarbonDataContextType {
  activities: CarbonActivity[];
  addActivities: (newActivities: CarbonActivity[]) => void;
  removeActivity: (id: string) => void;
  userData: User | null;
  setUserData: (data: User) => void;
  totalEmissions: number;
  clearData: () => void;
}

// Create the context with default values
const CarbonDataContext = createContext<CarbonDataContextType>({
  activities: [],
  addActivities: () => {},
  removeActivity: () => {},
  userData: null,
  setUserData: () => {},
  totalEmissions: 0,
  clearData: () => {}
});

// Storage keys
const STORAGE_KEYS = {
  ACTIVITIES: 'carbon_calculator_activities',
  USER_DATA: 'carbon_calculator_user_data',
  TOTAL_EMISSIONS: 'carbon_calculator_total_emissions'
};

// Load data from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

// Create a provider component
export const CarbonDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with data from localStorage
  const [activities, setActivities] = useState<CarbonActivity[]>(() => 
    loadFromStorage(STORAGE_KEYS.ACTIVITIES, [])
  );
  
  const [userData, setUserData] = useState<User | null>(() => 
    loadFromStorage(STORAGE_KEYS.USER_DATA, null)
  );
  
  const [totalEmissions, setTotalEmissions] = useState<number>(() => 
    loadFromStorage(STORAGE_KEYS.TOTAL_EMISSIONS, 0)
  );

  // Calculate carbon emissions based on activity type and value
  const calculateEmissions = (activities: CarbonActivity[]): number => {
    const factors: Record<ActivityType, number> = {
      driving: 0.2, // kg CO2e per km
      ai_usage: 0.1, // kg CO2e per hour
      commute: 0.15, // kg CO2e per km
      phone: 0.05, // kg CO2e per hour
      electricity: 0.5, // kg CO2e per kWh
      food: 2.5 // kg CO2e per kg of meat
    };

    return activities.reduce((total, activity) => {
      return total + (activity.value * factors[activity.type as ActivityType]);
    }, 0);
  };

  // Update total emissions when activities change
  const updateTotalEmissions = (activities: CarbonActivity[]) => {
    const total = calculateEmissions(activities);
    setTotalEmissions(total);
    saveToStorage(STORAGE_KEYS.TOTAL_EMISSIONS, total);
  };
  
  // Save activities to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
    updateTotalEmissions(activities);
  }, [activities]);
  
  // Save userData to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      saveToStorage(STORAGE_KEYS.USER_DATA, userData);
    }
  }, [userData]);

  // Add new activities
  const addActivities = (newActivities: CarbonActivity[]) => {
    const updatedActivities = [...activities, ...newActivities];
    setActivities(updatedActivities);
  };

  // Remove an activity
  const removeActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
  };

  // Update user data
  const setUserDataHandler = (data: User) => {
    setUserData(data);
  };

  // Clear all data
  const clearData = () => {
    setActivities([]);
    setUserData(null);
    setTotalEmissions(0);
    
    // Clear data from localStorage
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.TOTAL_EMISSIONS);
  };

  return (
    <CarbonDataContext.Provider value={{
      activities,
      addActivities,
      removeActivity,
      userData,
      setUserData: setUserDataHandler,
      totalEmissions,
      clearData
    }}>
      {children}
    </CarbonDataContext.Provider>
  );
};

// Custom hook to use the carbon data context
export const useCarbonData = () => useContext(CarbonDataContext);
