// Import testing utilities
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Import components to test
import App from './App';

// Mock child components to isolate App component testing
jest.mock('./components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="mock-navbar">Navbar</div>;
  };
});

jest.mock('./components/Chatbot', () => {
  return function MockChatbot() {
    return <div data-testid="mock-chatbot">Chatbot</div>;
  };
});

// Test suite for App component
describe('App Component', () => {
  // Test landing page render
  test('renders landing page by default', () => {
    render(<App />);
    expect(screen.getByText('Welcome to GetMeLoan')).toBeInTheDocument();
  });

  // Test navigation components presence
  test('renders navbar and chatbot components', () => {
    render(<App />);
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chatbot')).toBeInTheDocument();
  });

  // Test protected route redirection
  test('redirects to login when accessing protected route without auth', () => {
    render(<App />);
    // Attempt to navigate to protected route
    window.history.pushState({}, '', '/apply-loan');
    expect(screen.getByText('Login to Your Account')).toBeInTheDocument();
  });

  // Test public routes accessibility
  test('allows access to public routes', () => {
    render(<App />);
    
    // Check registration route
    window.history.pushState({}, '', '/register');
    expect(screen.getByText('Create New Account')).toBeInTheDocument();
    
    // Check login route
    window.history.pushState({}, '', '/login');
    expect(screen.getByText('Login to Your Account')).toBeInTheDocument();
  });

  // Test 404 page
  test('shows 404 page for invalid routes', () => {
    render(<App />);
    window.history.pushState({}, '', '/invalid-route');
    expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
  });
});