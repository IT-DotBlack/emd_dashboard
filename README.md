## Features

- Real-time weather data integration with Open-Meteo API
- Two view modes: Grid View and Interactive Tree View
- Simulated real-time data updates (auto-refresh every 30 seconds)
- Modern, responsive UI built with React and Tailwind CSS
- Dockerized application for easy deployment
- Comprehensive automated testing (unit, integration, functional)

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React
- **API**: Open-Meteo Weather API
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Running Tests

### Run all tests:
```bash
npm run test:run
```

### Run tests in watch mode:
```bash
npm test
```

### Run tests with UI:
```bash
npm run test:ui
```

### Run tests with coverage:
```bash
npm run test:coverage
```

## Docker Deployment

### Build the Docker image:
```bash
docker build -t environmental-monitoring-dashboard .
```

### Run with Docker Compose:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Stop the application:
```bash
docker-compose down
```
## Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard component
│   ├── GridView.tsx           # Grid view for data display
│   ├── TreeView.tsx           # Interactive tree view
│   ├── Dashboard.test.tsx     # Integration tests
│   ├── GridView.test.tsx      # Functional tests
│   └── TreeView.test.tsx      # Functional tests
├── services/
│   ├── weatherService.ts      # API integration service
│   └── weatherService.test.ts # Unit tests
├── test/
│   └── setup.ts              # Test setup and configuration
├── App.tsx                   # Root component
└── main.tsx                  # Application entry point
```

## API Integration

The application integrates with the Open-Meteo API to fetch real-time weather data from Pretoria, South Africa:

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Location**: Latitude -25.75, Longitude 28.19
- **Data**: Current weather including temperature, wind speed, wind direction, and weather conditions

## Features Details

### Grid View
Displays environmental data in a modern grid layout with:
- Temperature readings
- Wind speed and direction
- Location coordinates
- Elevation data
- Weather conditions

### Tree View
Interactive hierarchical view of the data with:
- Expandable/collapsible nodes
- Organized data structure
- Location, Weather, and Wind categories

### Real-time Updates
- Auto-refresh every 30 seconds (configurable)
- Manual refresh button
- Live update timestamps
- Visual loading indicators

## License

MIT
