import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCarbonData } from '../context/CarbonDataContext';
import { getCityData, getCitySuggestions } from '../utils/cityData';
import '../styles/AuthPage.css';

const AuthPage: React.FC = () => {
  const history = useHistory();
  const { setUserData, activities, totalEmissions } = useCarbonData();
  
  // Form state
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToUpdates, setAgreeToUpdates] = useState(false);
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  
  // Handle city input change and fetch suggestions
  useEffect(() => {
    if (city.length >= 2) {
      const suggestions = getCitySuggestions(city);
      setCitySuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);
  
  // Auto-fill country based on city selection
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    const cityData = getCityData(selectedCity);
    if (cityData.country) {
      setCountry(cityData.country);
    }
    setShowSuggestions(false);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node) &&
          cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email address to continue.');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Save user data to context
      setUserData({
        email,
        city,
        country
      });
      
      // Navigate to report page
      history.push('/report');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Your Report is Ready!</h2>
          <div className="progress-indicator">
            <div className="progress-bar"></div>
            <p>95% Complete</p>
          </div>
        </div>
        
        <div className="report-preview">
          <div className="preview-card">
            <h3>Your Carbon Footprint</h3>
            <div className="preview-value">{totalEmissions.toFixed(2)} kg CO2e</div>
            <p>Based on {activities.length} activities</p>
            <div className="preview-graphic">
              <div className="preview-icon">📊</div>
            </div>
          </div>
        </div>
        
        <div className="benefits-section">
          <h3>Unlock Your Full Report</h3>
          <ul className="benefits-list">
            <li>
              <div className="benefit-icon">🔍</div>
              <div className="benefit-text">
                <strong>Detailed Analysis</strong>
                <p>See the breakdown of your carbon footprint by activity</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">🏙️</div>
              <div className="benefit-text">
                <strong>Local Comparison</strong>
                <p>Compare your impact with others in your city</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">💡</div>
              <div className="benefit-text">
                <strong>Personalized Tips</strong>
                <p>Get AI-powered recommendations to reduce your footprint</p>
              </div>
            </li>
            <li>
              <div className="benefit-icon">📈</div>
              <div className="benefit-text">
                <strong>Progress Tracking</strong>
                <p>Monitor your carbon reduction journey over time</p>
              </div>
            </li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City (for better comparisons)</label>
            <div className="autocomplete-container">
              <input
                type="text"
                id="city"
                ref={cityInputRef}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => {
                  if (city.length >= 2) {
                    setCitySuggestions(getCitySuggestions(city));
                    setShowSuggestions(true);
                  }
                }}
                placeholder="e.g., New York"
                autoComplete="off"
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <div className="suggestions-container" ref={suggestionRef}>
                  {citySuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item"
                      onClick={() => handleCitySelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g., United States"
              className={city && country ? 'auto-filled' : ''}
            />
            {city && country && <div className="auto-filled-badge">Auto-filled</div>}
          </div>
          
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="updates"
              checked={agreeToUpdates}
              onChange={(e) => setAgreeToUpdates(e.target.checked)}
            />
            <label htmlFor="updates">
              Send me tips and updates on reducing my carbon footprint
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`view-report-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Generating Report...' : 'View My Full Report'}
          </button>
        </form>
        
        <div className="privacy-note">
          <p>
            <strong>Privacy Commitment:</strong> We respect your privacy. Your data will only be used 
            to generate your carbon report and will never be shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
