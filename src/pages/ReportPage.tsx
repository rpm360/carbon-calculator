import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCarbonData, CarbonActivity } from '../context/CarbonDataContext';
import { PieChart, BarChart } from '../components/Charts';
import { 
  getActivityTypeLabel, 
  generateRecommendations,
  carbonFactors
} from '../utils/helpers';
import { getCityData, getCountryAverage, globalAverage } from '../utils/cityData';
import '../styles/ReportPage.css';

const ReportPage: React.FC = () => {
  const history = useHistory();
  const { activities, userData, totalEmissions } = useCarbonData();
  const [cityAverage, setCityAverage] = useState<number>(0);
  const [countryAverage, setCountryAverage] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<Array<{title: string, description: string, impact: number}>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [averagePersonFootprint, setAveragePersonFootprint] = useState<number>(globalAverage);

  // Redirect to welcome page if no activities or user data
  useEffect(() => {
    if (activities.length === 0 || !userData) {
      history.push('/');
    }
  }, [activities, userData, history]);

  // Calculate city average, country average, and recommendations
  useEffect(() => {
    if (userData?.city) {
      const cityData = getCityData(userData.city);
      setCityAverage(cityData.averageFootprint);
      
      if (cityData.country) {
        const countryAvg = getCountryAverage(cityData.country);
        setCountryAverage(countryAvg);
        // Set average person footprint based on country or global average
        setAveragePersonFootprint(countryAvg);
      }
    }

    if (activities.length > 0) {
      setRecommendations(generateRecommendations(activities));
    }

    // Simulate loading time for report generation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activities, userData]);

  // Prepare chart data
  const pieChartData = activities.map(activity => ({
    type: activity.type,
    value: activity.value * carbonFactors[activity.type]
  }));

  const barChartData = [
    { label: 'Your Footprint', value: totalEmissions, type: 'user' as const },
    { label: `${userData?.city || 'City'} Average`, value: cityAverage, type: 'city' as const },
    { label: `${userData?.country || 'Country'} Average`, value: countryAverage, type: 'country' as const },
    { label: 'Average Person', value: averagePersonFootprint, type: 'average' as const },
    { label: 'Global Average', value: globalAverage, type: 'global' as const }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Generating Your Carbon Report...</h2>
        <p>Analyzing your activities and preparing personalized insights</p>
      </div>
    );
  }

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>Your Carbon Footprint Report</h1>
        <p>Based on your activities on {new Date().toLocaleDateString()}</p>
      </header>

      <div className="report-content">
        <div className="report-summary">
          <div className="total-emissions">
            <h2>{totalEmissions.toFixed(2)} kg CO2e</h2>
            <p>Your total carbon emissions</p>
            <div className="impact-level">
              {totalEmissions < 10 ? (
                <span className="low-impact">Low Impact</span>
              ) : totalEmissions < 20 ? (
                <span className="medium-impact">Medium Impact</span>
              ) : (
                <span className="high-impact">High Impact</span>
              )}
            </div>
          </div>
          
          <div className="user-info">
            <p><strong>Email:</strong> {userData?.email}</p>
            {userData?.city && <p><strong>Location:</strong> {userData.city}{userData.country ? `, ${userData.country}` : ''}</p>}
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-container">
            <h3>Emissions by Activity</h3>
            <div className="pie-chart">
              <PieChart 
                data={pieChartData} 
                title="Your Carbon Footprint Breakdown"
              />
            </div>
          </div>
          
          <div className="chart-container">
            <h3>How You Compare</h3>
            <div className="bar-chart">
              <BarChart 
                data={barChartData} 
                title="Your Footprint vs. Averages"
                yAxisLabel="kg CO2e per day"
              />
            </div>
          </div>
        </div>

        <div className="activities-breakdown">
          <h3>Your Activities</h3>
          <div className="activities-list">
            {activities.map((activity: CarbonActivity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-icon">
                  {activity.type === 'driving' && '🚗'}
                  {activity.type === 'ai_usage' && '🤖'}
                  {activity.type === 'commute' && '🚌'}
                  {activity.type === 'phone' && '📱'}
                  {activity.type === 'electricity' && '💡'}
                  {activity.type === 'food' && '🍔'}
                </div>
                <div className="activity-details">
                  <h4>{getActivityTypeLabel(activity.type)}</h4>
                  <p>{activity.value} {activity.unit}</p>
                </div>
                <div className="activity-impact">
                  <span>{(activity.value * carbonFactors[activity.type]).toFixed(2)} kg CO2e</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendations-section">
          <h3>How to Reduce Your Footprint</h3>
          <div className="recommendations-list">
            {recommendations.map((recommendation, index) => (
              <div className="recommendation-item" key={index}>
                <div className="recommendation-header">
                  <h4>{recommendation.title}</h4>
                  <span className="impact-value">-{recommendation.impact.toFixed(2)} kg CO2e</span>
                </div>
                <p>{recommendation.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-insights">
          <h3>AI-Powered Insights</h3>
          <div className="insight-content">
            <p>
              Based on your activity patterns, our AI analysis suggests that your carbon footprint is
              {totalEmissions < averagePersonFootprint ? ' below' : ' above'} the average person's footprint
              {userData?.city ? ` in ${userData.city}` : ''}.
              {totalEmissions < averagePersonFootprint 
                ? ' Great job! You\'re already making choices that help the environment.' 
                : ' There are opportunities to reduce your environmental impact.'}
              
              {userData?.city && ` The average person in ${userData.city} produces about ${cityAverage.toFixed(1)} kg CO2e per day.`}
              {userData?.country && ` In ${userData.country}, the national average is ${countryAverage.toFixed(1)} kg CO2e per day.`}
            </p>
            <p>
              The biggest contributor to your carbon footprint is 
              {pieChartData.sort((a, b) => b.value - a.value)[0]?.type 
                ? getActivityTypeLabel(pieChartData.sort((a, b) => b.value - a.value)[0].type)
                : 'unknown'}.
              Focusing on reducing this activity would have the most significant impact.
            </p>
            <p>
              If you implemented all our recommendations, you could reduce your carbon footprint by approximately
              {' '}{recommendations.reduce((sum, rec) => sum + rec.impact, 0).toFixed(2)} kg CO2e.
            </p>
          </div>
        </div>

        <div className="share-section">
          <h3>Share Your Results</h3>
          <p>Inspire others to calculate and reduce their carbon footprint</p>
          <div className="share-buttons">
            <button className="share-btn twitter">Twitter</button>
            <button className="share-btn facebook">Facebook</button>
            <button className="share-btn email">Email</button>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="recalculate-btn"
            onClick={() => history.push('/')}
          >
            Recalculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
