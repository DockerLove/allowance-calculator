import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application header and empty state', () => {
  render(<App />);
  expect(screen.getByText(/Автоматический выбор СОЖ/i)).toBeInTheDocument();
  expect(screen.getByText(/Заполните исходные данные/i)).toBeInTheDocument();
});
