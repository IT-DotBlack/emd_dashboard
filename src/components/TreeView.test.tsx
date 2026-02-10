import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeView from './TreeView';

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

describe('TreeView Functional Tests', () => {
  it('should render tree structure with environmental data', () => {
    render(<TreeView data={mockWeatherData} description="Clear sky" />);

    expect(screen.getByText('Environmental Data')).toBeInTheDocument();
    expect(screen.getByText('Location Information')).toBeInTheDocument();
    expect(screen.getByText('Weather Conditions')).toBeInTheDocument();
    expect(screen.getByText('Wind Data')).toBeInTheDocument();
  });

  it('should display all weather values in tree nodes', () => {
    render(<TreeView data={mockWeatherData} description="Clear sky" />);

    expect(screen.getByText('-25.75°')).toBeInTheDocument();
    expect(screen.getByText('28.19°')).toBeInTheDocument();
    expect(screen.getByText('1339m')).toBeInTheDocument();
    expect(screen.getByText('22.5°C')).toBeInTheDocument();
    expect(screen.getByText('10.2 km/h')).toBeInTheDocument();
    expect(screen.getByText('180°')).toBeInTheDocument();
  });

  it('should collapse and expand tree nodes', () => {
    render(<TreeView data={mockWeatherData} description="Clear sky" />);

    const locationNode = screen.getByText('Location Information');
    expect(screen.getByText('Latitude')).toBeInTheDocument();

    fireEvent.click(locationNode);

    expect(screen.queryByText('Latitude')).not.toBeInTheDocument();

    fireEvent.click(locationNode);

    expect(screen.getByText('Latitude')).toBeInTheDocument();
  });

  it('should display no data message when data is null', () => {
    render(<TreeView data={null} description="" />);

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
