import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCarbonData, ActivityType, CarbonActivity } from '../context/CarbonDataContext';
import { activityUnits, generateId, getActivityTypeLabel } from '../utils/helpers';
import '../styles/WelcomePage.css';

const WelcomePage: React.FC = () => {
  const history = useHistory();
  const { addActivities } = useCarbonData();
  
  // State for form values
  const [activities, setActivities] = useState<Record<ActivityType, number>>({
    driving: 0,
    ai_usage: 0,
    commute: 0,
    phone: 0,
    electricity: 0,
    food: 0
  });

  // Handle input changes
  const handleInputChange = (type: ActivityType, value: string) => {
    const numValue = parseFloat(value);
    setActivities({
      ...activities,
      [type]: isNaN(numValue) ? 0 : numValue
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert activities object to array of CarbonActivity objects
    const activityArray: CarbonActivity[] = Object.entries(activities)
      .filter(([_, value]) => value > 0) // Only include activities with values > 0
      .map(([type, value]) => ({
        id: generateId(),
        type: type as ActivityType,
        value,
        unit: activityUnits[type as ActivityType],
        timestamp: new Date()
      }));
    
    if (activityArray.length === 0) {
      alert('Please enter at least one activity before continuing.');
      return;
    }
    
    // Add activities to context
    addActivities(activityArray);
    
    // Navigate to auth page
    history.push('/auth');
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Carbon Footprint Calculator</h1>
        <p>Track your daily activities and understand their environmental impact</p>
      </header>

      <div className="welcome-content">
        <div className="intro-section">
          <h2>Why Calculate Your Carbon Footprint?</h2>
          <p>
            Your daily activities contribute to greenhouse gas emissions. By understanding your
            carbon footprint, you can make informed decisions to reduce your environmental impact.
          </p>
          <div className="earth-graphic">
            <div className="earth-icon">🌍</div>
            <p>Every small change helps protect our planet</p>
          </div>
        </div>

        <div className="form-section">
          <h2>Enter Your Daily Activities</h2>
          <form onSubmit={handleSubmit}>
            {(Object.keys(activities) as ActivityType[]).map((type) => (
              <div className="activity-input" key={type}>
                <label htmlFor={type}>{getActivityTypeLabel(type)}</label>
                <div className="input-group">
                  <input
                    type="range"
                    id={type}
                    min="0"
                    max={type === 'food' ? 5 : type === 'ai_usage' || type === 'phone' ? 24 : 100}
                    step={type === 'food' ? 0.1 : 1}
                    value={activities[type]}
                    onChange={(e) => handleInputChange(type, e.target.value)}
                  />
                  <div className="value-display">
                    <input
                      type="number"
                      value={activities[type]}
                      min="0"
                      max={type === 'food' ? 5 : type === 'ai_usage' || type === 'phone' ? 24 : 100}
                      step={type === 'food' ? 0.1 : 1}
                      onChange={(e) => handleInputChange(type, e.target.value)}
                    />
                    <span className="unit">{activityUnits[type]}</span>
                  </div>
                </div>
                <p className="activity-description">
                  {type === 'driving' && 'Distance traveled by car'}
                  {type === 'ai_usage' && 'Time spent using AI tools (ChatGPT, image generators, etc.)'}
                  {type === 'commute' && 'Distance traveled by public transportation'}
                  {type === 'phone' && 'Time spent using your phone or other devices'}
                  {type === 'electricity' && 'Electricity consumed at home'}
                  {type === 'food' && 'Amount of meat consumed'}
                </p>
              </div>
            ))}

            <button type="submit" className="submit-btn">Calculate My Footprint</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
