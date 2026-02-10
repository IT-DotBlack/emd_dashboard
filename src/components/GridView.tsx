import { WeatherData } from '../services/weatherService';
import { Thermometer, Wind, Compass, MapPin, Mountain, Clock } from 'lucide-react';

interface GridViewProps {
  data: WeatherData | null;
  description: string;
}

export default function GridView({ data, description }: GridViewProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const gridItems = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${data.temperature}°C`,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.windspeed} km/h`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Compass,
      label: 'Wind Direction',
      value: `${data.winddirection}°`,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: `${data.latitude}°, ${data.longitude}°`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Mountain,
      label: 'Elevation',
      value: `${data.elevation}m`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Clock,
      label: 'Weather',
      value: description,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gridItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <div className={`${item.bgColor} p-3 rounded-lg`}>
                <Icon className={`${item.color} w-6 h-6`} />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-700">{item.label}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
