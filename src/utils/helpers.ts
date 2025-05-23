import { ActivityType, CarbonActivity } from '../context/CarbonDataContext';

// Generate a simple unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Carbon emission factors for different activity types (kg CO2e)
export const carbonFactors: Record<ActivityType, number> = {
  driving: 0.2, // kg CO2e per km
  ai_usage: 0.1, // kg CO2e per hour
  commute: 0.15, // kg CO2e per km
  phone: 0.05, // kg CO2e per hour
  electricity: 0.5, // kg CO2e per kWh
  food: 2.5 // kg CO2e per kg of meat
};

// Units for each activity type
export const activityUnits: Record<ActivityType, string> = {
  driving: 'km',
  ai_usage: 'hours',
  commute: 'km',
  phone: 'hours',
  electricity: 'kWh',
  food: 'kg'
};

// Calculate total emissions from activities
export const calculateTotalEmissions = (activities: CarbonActivity[]): number => {
  return activities.reduce((total, activity) => {
    return total + (activity.value * carbonFactors[activity.type as ActivityType]);
  }, 0);
};

// Get a human-readable label for activity types
export const getActivityTypeLabel = (type: ActivityType): string => {
  switch(type) {
    case 'driving': return 'Car Driving';
    case 'ai_usage': return 'AI Tool Usage';
    case 'commute': return 'Public Transportation';
    case 'phone': return 'Phone/Device Usage';
    case 'electricity': return 'Electricity Consumption';
    case 'food': return 'Food (Meat) Consumption';
    default: return type;
  }
};

// Generate city average carbon emissions (simulated data)
export const getCityAverage = (city: string): number => {
  // In a real app, this would come from a database or API
  const cityAverages: Record<string, number> = {
    'New York': 15.2,
    'Los Angeles': 18.5,
    'Chicago': 16.8,
    'Houston': 21.3,
    'Phoenix': 19.7,
    'Philadelphia': 14.9,
    'San Antonio': 20.1,
    'San Diego': 17.3,
    'Dallas': 20.5,
    'San Jose': 16.2
  };
  
  // Return the city average if it exists, otherwise return a default value
  return cityAverages[city] || 18.0;
};

// Generate personalized recommendations based on activities
export const generateRecommendations = (activities: CarbonActivity[]): Array<{title: string, description: string, impact: number}> => {
  const recommendations = [];
  
  // Group activities by type
  const activityByType: Record<ActivityType, number> = {
    driving: 0,
    ai_usage: 0,
    commute: 0,
    phone: 0,
    electricity: 0,
    food: 0
  };
  
  activities.forEach(activity => {
    activityByType[activity.type as ActivityType] += activity.value;
  });
  
  // Generate recommendations based on activity levels
  if (activityByType.driving > 30) {
    recommendations.push({
      title: 'Reduce Car Usage',
      description: 'Consider carpooling, using public transport, or cycling for short distances.',
      impact: activityByType.driving * 0.1 * carbonFactors.driving
    });
  }
  
  if (activityByType.ai_usage > 3) {
    recommendations.push({
      title: 'Optimize AI Usage',
      description: 'Batch your AI tasks and be more specific with prompts to reduce processing time.',
      impact: activityByType.ai_usage * 0.2 * carbonFactors.ai_usage
    });
  }
  
  if (activityByType.electricity > 10) {
    recommendations.push({
      title: 'Reduce Energy Consumption',
      description: 'Turn off lights and unplug devices when not in use. Consider energy-efficient appliances.',
      impact: activityByType.electricity * 0.15 * carbonFactors.electricity
    });
  }
  
  if (activityByType.food > 0.5) {
    recommendations.push({
      title: 'Reduce Meat Consumption',
      description: 'Try incorporating more plant-based meals into your diet.',
      impact: activityByType.food * 0.3 * carbonFactors.food
    });
  }
  
  // Add a general recommendation if we have few specific ones
  if (recommendations.length < 2) {
    recommendations.push({
      title: 'Track More Activities',
      description: 'Add more of your daily activities to get personalized recommendations.',
      impact: 1.5
    });
  }
  
  return recommendations;
};
