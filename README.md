# Carbon Calculator Web Application

A comprehensive web application that allows users to calculate and understand their carbon emissions by tracking daily activities, providing personalized insights, and visualizing environmental impact through an engaging, user-friendly interface with AI-powered recommendations.

![Carbon Calculator Screenshot](https://via.placeholder.com/800x450.png?text=Carbon+Calculator+Screenshot)

## Features

- **Multi-page Application**: Seamless flow between welcome form, authentication, and detailed report
- **Personalized Carbon Tracking**: Calculate emissions from various daily activities
- **Interactive Data Visualization**: Professional charts to visualize your carbon footprint
- **AI-Powered Recommendations**: Get personalized suggestions to reduce your carbon footprint
- **City & Country Comparisons**: Compare your emissions with local and national averages
- **Data Persistence**: Your data is saved locally for a seamless experience
- **Mobile-Friendly Design**: Responsive layout works on all devices

## Installation

### Prerequisites

- Node.js (v12.18.2 or higher)
- npm (v6.14.5 or higher)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/carbon-calculator.git
   cd carbon-calculator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000

### Using Docker

1. For development with hot reloading:
   ```bash
   docker-compose up dev
   ```

2. For production build testing:
   ```bash
   docker-compose up prod
   ```

## Deployment

### GitHub Pages Deployment

This application is configured for easy deployment to GitHub Pages:

1. Push your code to a GitHub repository

2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set the source to GitHub Actions

3. The GitHub Actions workflow will automatically build and deploy your application when you push to the main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, which you can deploy to any static hosting service

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t carbon-calculator .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 carbon-calculator
   ```

3. Access the application at http://localhost:8080

## Usage Guide

### Welcome Page

1. Enter your daily activities using the sliders and input fields
2. Activities include driving, AI usage, commuting, phone usage, electricity consumption, and food choices
3. Click "Calculate My Footprint" to proceed

### Authentication Page

1. Enter your email address (optional)
2. Start typing your city name to see autocomplete suggestions
3. Select a city to automatically fill in your country
4. Opt in for updates if desired
5. Click "View My Full Report" to see your results

### Report Page

1. View your total carbon footprint
2. Explore the breakdown of emissions by activity type
3. Compare your footprint with city, country, and global averages
4. Read personalized AI-powered recommendations
5. Share your results or start over

## Technical Details

### Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router (v5.3.0)
- **State Management**: Context API with localStorage persistence
- **Data Visualization**: Chart.js with react-chartjs-2
- **Styling**: CSS Modules
- **Deployment**: GitHub Pages, Docker

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Charts.tsx    # Data visualization components
│   ├── ErrorBoundary.tsx # Error handling component
│   └── LoadingSpinner.tsx # Loading state component
├── context/
│   └── CarbonDataContext.tsx # Application state management
├── pages/
│   ├── WelcomePage.tsx # Activity input form
│   ├── AuthPage.tsx    # User information collection
│   └── ReportPage.tsx  # Results and recommendations
├── styles/            # CSS stylesheets
├── utils/
│   ├── helpers.ts     # Utility functions
│   └── cityData.ts    # City/country mapping data
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

### Performance Optimizations

- **Code Splitting**: Lazy loading of page components
- **Bundle Optimization**: Separate vendor and chart libraries
- **Caching**: Local storage for user data persistence

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chart.js for the data visualization
- React and TypeScript communities
- All contributors who have helped improve this project
