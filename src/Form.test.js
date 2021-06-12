import { render, screen } from '@testing-library/react';
import App from './App';

test('renders headline', () => {
  render(<App />);
  const textElement = screen.getByText(/Fill the form to generate meme/i);
  expect(textElement).toBeInTheDocument();
});

test('renders button', () => {
    render(<App  />);
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
});