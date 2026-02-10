import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import * as weatherService from '../services/weatherService';

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

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render dashboard and load weather data', async () => {
    vi.spyOn(weatherService, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    render(<Dashboard />);

    expect(screen.getByText(/Environmental Monitoring Dashboard/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('22.5°C')).toBeInTheDocument();
    });

    expect(screen.getByText('10.2 km/h')).toBeInTheDocument();
    expect(screen.getByText('180°')).toBeInTheDocument();
  });

  it('should display error message when API fails', async () => {
    vi.spyOn(weatherService, 'fetchWeatherData').mockRejectedValue(new Error('API Error'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch weather data/i)).toBeInTheDocument();
    });
  });

  it('should switch between grid and tree view', async () => {
    vi.spyOn(weatherService, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('22.5°C')).toBeInTheDocument();
    });

    const treeViewButton = screen.getByText(/Tree View/i);
    fireEvent.click(treeViewButton);

    expect(screen.getByText(/Environmental Data/i)).toBeInTheDocument();

    const gridViewButton = screen.getByText(/Grid View/i);
    fireEvent.click(gridViewButton);

    expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
  });

  it('should refresh data when refresh button is clicked', async () => {
    const fetchSpy = vi.spyOn(weatherService, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    render(<Dashboard />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    const refreshButton = screen.getByRole('button', { name: /^Refresh$/i });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('should toggle auto-refresh', async () => {
    vi.spyOn(weatherService, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('22.5°C')).toBeInTheDocument();
    });

    const autoRefreshButton = screen.getByText(/Auto-Refresh ON/i);
    expect(autoRefreshButton).toBeInTheDocument();

    fireEvent.click(autoRefreshButton);

    expect(screen.getByText(/Auto-Refresh OFF/i)).toBeInTheDocument();
  });
});
