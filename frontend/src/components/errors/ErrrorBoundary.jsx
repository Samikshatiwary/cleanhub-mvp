import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/react'; 

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      isOnline: navigator.onLine,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorId = this.logError(error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      errorId,
      retryCount: this.state.retryCount + 1
    });

    if (this.state.retryCount < this.props.maxRetries) {
      setTimeout(() => {
        this.handleReset();
      }, this.props.retryDelay);
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  
  logError = (error, errorInfo) => {
    console.error('ErrorBoundary caught:', error, errorInfo);
    
    
    const errorId = `err-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    
    if (this.props.enableSentry) {
      Sentry.withScope((scope) => {
        scope.setExtras({
          componentStack: errorInfo.componentStack,
          retryCount: this.state.retryCount
        });
        Sentry.captureException(error);
      });
    }
    
    
    if (this.props.errorLoggingEndpoint) {
      this.logErrorToBackend(error, errorInfo, errorId);
    }
    
    return errorId;
  };

  logErrorToBackend = async (error, errorInfo, errorId) => {
    try {
      await fetch(this.props.errorLoggingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorId,
          error: error.toString(),
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to log error to backend:', err);
    }
  };

  
  handleReset = () => {
    if (this.state.isOnline || this.props.allowOfflineReset) {
      this.setState({ 
        hasError: false,
        error: null,
        errorInfo: null
      });
      
      if (this.props.onReset) {
        this.props.onReset();
      }
    }
  };

  
  handleFeedbackSubmit = (feedback) => {
    if (this.props.feedbackEndpoint) {
      fetch(this.props.feedbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorId: this.state.errorId,
          feedback,
          url: window.location.href
        })
      });
    }
    
    if (this.props.onFeedbackSubmit) {
      this.props.onFeedbackSubmit(feedback);
    }
  };

  
  renderDebugInfo() {
    if (!this.props.showDebugInfo) return null;
    
    return (
      <details className="mt-4 text-left">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer">
          Technical Details (Error ID: {this.state.errorId})
        </summary>
        <div className="mt-2 p-3 bg-gray-100 rounded-md overflow-auto max-h-60">
          <h4 className="font-bold text-sm mb-1">Error:</h4>
          <p className="text-red-600 font-mono text-sm">
            {this.state.error?.toString()}
          </p>
          
          <h4 className="font-bold text-sm mt-3 mb-1">Stack Trace:</h4>
          <pre className="text-xs text-gray-600">
            {this.state.error?.stack}
          </pre>
          
          <h4 className="font-bold text-sm mt-3 mb-1">Component Stack:</h4>
          <pre className="text-xs text-gray-600">
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      </details>
    );
  }

  renderFeedbackForm() {
    if (!this.props.showFeedbackForm) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Help us improve by describing what went wrong:
        </h4>
        <textarea
          className="w-full p-2 border rounded-md text-sm"
          rows={3}
          ref={this.feedbackRef}
          placeholder="What were you trying to do when the error occurred?"
        />
        <button
          onClick={() => this.handleFeedbackSubmit(this.feedbackRef.current.value)}
          className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
        >
          Submit Feedback
        </button>
      </div>
    );
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            <h2 className="mt-3 text-xl font-bold text-gray-900">
              {this.props.fallbackTitle || "Something went wrong!"}
            </h2>
            
            <p className="mt-2 text-sm text-gray-500">
              {this.state.isOnline 
                ? this.props.fallbackMessage || "We're sorry for the inconvenience. Please try again."
                : this.props.offlineMessage || "You appear to be offline. Please check your connection."}
            </p>
            
            {this.state.retryCount < this.props.maxRetries && (
              <p className="mt-2 text-xs text-gray-400">
                Attempting to recover ({this.state.retryCount + 1}/{this.props.maxRetries})...
              </p>
            )}

            {this.renderDebugInfo()}
            {this.renderFeedbackForm()}

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={this.handleReset}
                disabled={!this.state.isOnline && !this.props.allowOfflineReset}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  (!this.state.isOnline && !this.props.allowOfflineReset)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {this.props.resetButtonText || "Try again"}
              </button>
              
              {this.props.showHomeButton && (
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Go to Home
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackTitle: PropTypes.string,
  fallbackMessage: PropTypes.string,
  offlineMessage: PropTypes.string,
  resetButtonText: PropTypes.string,
  showDebugInfo: PropTypes.bool,
  showFeedbackForm: PropTypes.bool,
  showHomeButton: PropTypes.bool,
  onReset: PropTypes.func,
  onFeedbackSubmit: PropTypes.func,
  maxRetries: PropTypes.number,
  retryDelay: PropTypes.number,
  allowOfflineReset: PropTypes.bool,
  enableSentry: PropTypes.bool,
  errorLoggingEndpoint: PropTypes.string,
  feedbackEndpoint: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  showDebugInfo: process.env.NODE_ENV !== 'production',
  showFeedbackForm: false,
  showHomeButton: true,
  maxRetries: 3,
  retryDelay: 5000, 
  allowOfflineReset: false,
  enableSentry: false,
};

export default ErrorBoundary;