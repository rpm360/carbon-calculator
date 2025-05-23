// React is used implicitly by JSX
import { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { CarbonDataProvider } from './context/CarbonDataContext'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'
import './styles/ErrorBoundary.css'

// Lazy load page components for better performance
const WelcomePage = lazy(() => import('./pages/WelcomePage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const ReportPage = lazy(() => import('./pages/ReportPage'))

function App() {
  return (
    <ErrorBoundary>
      <CarbonDataProvider>
        <Router>
          <div className="app-container">
            <Suspense fallback={<LoadingSpinner message="Loading Carbon Calculator..." />}>
              <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/report" component={ReportPage} />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </CarbonDataProvider>
    </ErrorBoundary>
  )
}

export default App
