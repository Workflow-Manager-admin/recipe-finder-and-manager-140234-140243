import { render, screen } from '@testing-library/react';
import App from './App';

test('renders theme toggle and recipe app root', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /dark|light/i })).toBeInTheDocument();
  expect(screen.getByText(/recipebox/i)).toBeInTheDocument();
});
