export type Language = 'en' | 'hi' | 'pa';
export type AppMode = 'farmer' | 'state';
export type PageTab = 'problemsolution' | 'dashboard' | 'geospatial' | 'crops' | 'diagnostics' | 'state' | 'khata' | 'auth';

export type UserRole = 'farmer' | 'officer';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email?: string;
  state: string;
  district: string;
  farmSizeAcres?: number;
  primaryCrops?: string[];
  kisanId?: string;
  officerDesignation?: string;
  isVerified: boolean;
  joinedDate: string;
}

export interface WeatherHourlyItem {
  time: string;
  temp: number;
  rainProb: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface WeatherDailyItem {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  precipitationSum?: number;
  humidity?: number;
  windSpeed: number;
  condition: string;
  conditionHi?: string;
  icon: string;
}

export interface WeatherAgriAdvisory {
  sprayWindow: {
    status: string;
    badgeColor: string;
    text: string;
    textHi: string;
  };
  irrigationAdvisory: {
    needed: boolean;
    badgeColor: string;
    text: string;
    textHi: string;
  };
  thermalStress: {
    level: string;
    text: string;
    textHi: string;
  };
}

export interface DetailedWeatherData {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
  conditionHi?: string;
  cloudCover: number;
  visibility: number;
  rainfallProbability: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  locationName: string;
  source: string;
  hourly: WeatherHourlyItem[];
  daily: WeatherDailyItem[];
  provider: string;
  apiKeyStatus: string;
  apiKeyMasked?: string;
  agriAdvisory?: WeatherAgriAdvisory;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfallProbability: number;
  windSpeed: number;
  condition: string;
  locationName: string;
  source: string;
  forecast: Array<{
    day: string;
    temp: number;
    rainProb: number;
    icon: string;
  }>;
}

export interface SoilNutrient {
  name: string;
  symbol: string;
  value: number; // e.g. kg/ha or pH
  optimalMin: number;
  optimalMax: number;
  unit: string;
  status: 'Optimal' | 'Deficient' | 'Excess';
  recommendation: {
    en: string;
    hi: string;
    pa: string;
  };
}

export interface SoilHealthProfile {
  district: string;
  soilType: string;
  ph: number;
  organicCarbonPercent: number;
  nutrients: SoilNutrient[];
}

export interface CropRecommendation {
  id: string;
  name: string;
  hindiName: string;
  punjabiName: string;
  confidence: number;
  suitabilityTag: string;
  projectedYield: string;
  waterNeed: 'Low' | 'Moderate' | 'High';
  growingPeriodDays: number;
  marketPricePerQuintal: number;
  expectedProfitPerAcre: string;
  sowingWindow: string;
  imageUrl?: string;
  description: {
    en: string;
    hi: string;
    pa: string;
  };
}

export interface DiseaseDiagnosticResult {
  diseaseName: string;
  cropAffected: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionTips: string[];
  summary: string;
  analyzedAt: string;
}

export interface StateNetworkRecord {
  stateCode: string;
  stateName: string;
  primaryCrop: string;
  totalCultivatedAreaHectares: number;
  surplusStatus: string;
  statusType: 'surplus' | 'deficit';
  dataSharingStatus: 'Active' | 'Syncing';
  lastTelemetrySync: string;
  satelliteSensor: string;
  soilHealthScore: number;
  openDataEndpoint: string;
}

export interface BuyerBid {
  id: string;
  buyerName: string;
  verified: boolean;
  rating: number;
  cropRequested: string;
  quantityDemanded: string;
  bidPricePerQuintal: number;
  governmentMsp: number;
  premiumAboveMsp: string;
  location: string;
  distanceKm: number;
  paymentTerms: string;
  contactPhone: string;
  cropImageUrl?: string;
}

export interface YieldForecastData {
  cropName: string;
  forecastQuintalsPerAcre: number;
  historicalAverage: number;
  satelliteNdviIndex: number;
  soilMoistureScore: number;
  climaticRisk: 'Low' | 'Moderate' | 'High';
  marketOutlookScore: number;
  monthlyTrend: Array<{
    month: string;
    projectedYield: number;
    rainfallMm: number;
  }>;
}

export type MapLayerType = 'satellite' | 'rainRadar' | 'soilMoisture' | 'plainRegion' | 'ndvi' | 'terrain' | 'osm' | 'nasaGibs' | 'cropCoverage' | 'isroBhuvan';
