import { render, screen } from '@testing-library/react';
import App from './App';

test('renders career guidance chatbot', () => {
  render(<App />);
  const headerElement = screen.getByText(/Career Counseling Assistant/i);
  expect(headerElement).toBeInTheDocument();
});
