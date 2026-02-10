import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeatherData, getWeatherDescription } from './weatherService';

describe('weatherService', () => {
  describe('fetchWeatherData', () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });

    it('should fetch weather data successfully', async () => {
      const mockData = {
        latitude: -25.75,
        longitude: 28.19,
        elevation: 1339,
        current_weather: {
          temperature: 22.5,
          windspeed: 10.2,
          winddirection: 180,
          weathercode: 0,
          time: '2024-01-01T12:00:00',
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchWeatherData();

      expect(result).toEqual({
        latitude: -25.75,
        longitude: 28.19,
        temperature: 22.5,
        windspeed: 10.2,
        winddirection: 180,
        weathercode: 0,
        time: '2024-01-01T12:00:00',
        elevation: 1339,
      });
    });

    it('should throw error when API request fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(fetchWeatherData()).rejects.toThrow();
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchWeatherData()).rejects.toThrow();
    });
  });

  describe('getWeatherDescription', () => {
    it('should return correct description for clear sky', () => {
      expect(getWeatherDescription(0)).toBe('Clear sky');
    });

    it('should return correct description for rain', () => {
      expect(getWeatherDescription(61)).toBe('Slight rain');
      expect(getWeatherDescription(63)).toBe('Moderate rain');
      expect(getWeatherDescription(65)).toBe('Heavy rain');
    });

    it('should return correct description for thunderstorm', () => {
      expect(getWeatherDescription(95)).toBe('Thunderstorm');
    });

    it('should return Unknown for invalid code', () => {
      expect(getWeatherDescription(999)).toBe('Unknown');
    });
  });
});
