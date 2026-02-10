import { useState } from 'react';
import { WeatherData } from '../services/weatherService';
import { ChevronDown, ChevronRight, Database, MapPin, Thermometer, Wind, CloudDrizzle } from 'lucide-react';

interface TreeViewProps {
  data: WeatherData | null;
  description: string;
}

interface TreeNode {
  id: string;
  label: string;
  value?: string;
  children?: TreeNode[];
  icon?: React.ComponentType<{ className?: string }>;
}

export default function TreeView({ data, description }: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root', 'location', 'weather', 'wind']));

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const treeData: TreeNode = {
    id: 'root',
    label: 'Environmental Data',
    icon: Database,
    children: [
      {
        id: 'location',
        label: 'Location Information',
        icon: MapPin,
        children: [
          { id: 'lat', label: 'Latitude', value: `${data.latitude}°` },
          { id: 'lon', label: 'Longitude', value: `${data.longitude}°` },
          { id: 'elev', label: 'Elevation', value: `${data.elevation}m` },
        ],
      },
      {
        id: 'weather',
        label: 'Weather Conditions',
        icon: CloudDrizzle,
        children: [
          { id: 'temp', label: 'Temperature', value: `${data.temperature}°C` },
          { id: 'code', label: 'Weather Code', value: `${data.weathercode}` },
          { id: 'desc', label: 'Description', value: description },
          { id: 'time', label: 'Last Updated', value: new Date(data.time).toLocaleString() },
        ],
      },
      {
        id: 'wind',
        label: 'Wind Data',
        icon: Wind,
        children: [
          { id: 'speed', label: 'Speed', value: `${data.windspeed} km/h` },
          { id: 'dir', label: 'Direction', value: `${data.winddirection}°` },
        ],
      },
    ],
  };

  const toggleNode = (nodeId: string) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const Icon = node.icon;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
            level === 0 ? 'font-semibold' : ''
          }`}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2 text-gray-600" />
            )
          ) : (
            <span className="w-4 h-4 mr-2" />
          )}

          {Icon && <Icon className="w-4 h-4 mr-2 text-blue-600" />}

          <span className="text-gray-800">{node.label}</span>

          {node.value && (
            <span className="ml-auto text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {node.value}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="transition-all duration-200">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-1">{renderNode(treeData)}</div>
    </div>
  );
}
