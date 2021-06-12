import { render, screen } from '@testing-library/react';
import App from './App';

test('renders headline', () => {
  render(<App />);
  const textElement = screen.getByText(/Chuck Norris Meme by yourself/i);
  expect(textElement).toBeInTheDocument();
});
