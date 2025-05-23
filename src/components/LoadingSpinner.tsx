import { FC } from 'react';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
