import { useState, useEffect } from 'react';
import { WeatherData, fetchWeatherData, getWeatherDescription } from '../services/weatherService';
import GridView from './GridView';
import TreeView from './TreeView';
import { LayoutGrid, Network, RefreshCw, Activity } from 'lucide-react';

type ViewMode = 'grid' | 'tree';

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData();
      setWeatherData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      loadWeatherData();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const description = weatherData ? getWeatherDescription(weatherData.weathercode) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Activity className="w-10 h-10 text-blue-600" />
                Environmental Monitoring Dashboard
              </h1>
              <p className="text-gray-600">Pretoria, South Africa</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isAutoRefresh
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isAutoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
              </button>

              <button
                onClick={loadWeatherData}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('tree')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  viewMode === 'tree'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Network className="w-4 h-4" />
                Tree View
              </button>
            </div>
          </div>
        </header>

        {loading && !weatherData && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading environmental data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && weatherData && (
          <div className="animate-fade-in">
            {viewMode === 'grid' ? (
              <GridView data={weatherData} description={description} />
            ) : (
              <TreeView data={weatherData} description={description} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
