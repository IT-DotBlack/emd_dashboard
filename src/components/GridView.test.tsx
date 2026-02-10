import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GridView from './GridView';

const mockWeatherData = {
  latitude: -25.75,
  longitude: 28.19,
  temperature: 22.5,
  windspeed: 10.2,
  winddirection: 180,
  weathercode: 0,
  time: '2024-01-01T12:00:00',
  elevation: 1339,
};

describe('GridView Functional Tests', () => {
  it('should render all weather data in grid format', () => {
    render(<GridView data={mockWeatherData} description="Clear sky" />);

    expect(screen.getByText('22.5°C')).toBeInTheDocument();
    expect(screen.getByText('10.2 km/h')).toBeInTheDocument();
    expect(screen.getByText('180°')).toBeInTheDocument();
    expect(screen.getByText('-25.75°, 28.19°')).toBeInTheDocument();
    expect(screen.getByText('1339m')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('should display no data message when data is null', () => {
    render(<GridView data={null} description="" />);

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it('should render all grid items with proper labels', () => {
    render(<GridView data={mockWeatherData} description="Clear sky" />);

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('Wind Direction')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Elevation')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
  });
});
