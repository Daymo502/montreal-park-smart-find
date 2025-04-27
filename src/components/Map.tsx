
import React, { useState, useEffect } from 'react';
import { MapPinIcon, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Mocked parking spot data
const INITIAL_PARKING_SPOTS = [
  {
    id: "p1",
    name: { en: "Place des Arts Garage", fr: "Stationnement Place des Arts" },
    location: { lat: 45.5081, lng: -73.5685 },
    type: { en: "Garage", fr: "Garage" },
    price: { en: "$18/day", fr: "18$/jour" },
    availability: 45,
    totalSpots: 200,
    isFree: false,
    distance: "350m",
    restrictions: { en: "Height limit 6'2\"", fr: "Limite de hauteur 1.9m" }
  },
  {
    id: "p2",
    name: { en: "Saint-Laurent Street", fr: "Rue Saint-Laurent" },
    location: { lat: 45.5105, lng: -73.5717 },
    type: { en: "Street", fr: "Rue" },
    price: { en: "Free", fr: "Gratuit" },
    availability: 3,
    totalSpots: 8,
    isFree: true,
    distance: "500m",
    restrictions: { en: "2h max, 9am-7pm", fr: "Max 2h, 9h-19h" }
  },
  {
    id: "p3",
    name: { en: "Place Ville Marie", fr: "Place Ville Marie" },
    location: { lat: 45.5016, lng: -73.5693 },
    type: { en: "Underground", fr: "Souterrain" },
    price: { en: "$25/day", fr: "25$/jour" },
    availability: 120,
    totalSpots: 500,
    isFree: false,
    distance: "750m",
    restrictions: { en: "24h access", fr: "Accès 24h" }
  },
  {
    id: "p4",
    name: { en: "Saint Catherine East", fr: "Rue Sainte-Catherine Est" },
    location: { lat: 45.5138, lng: -73.5644 },
    type: { en: "Street", fr: "Rue" },
    price: { en: "Free", fr: "Gratuit" },
    availability: 0,
    totalSpots: 12,
    isFree: true,
    distance: "600m",
    restrictions: { en: "No parking 3-6am", fr: "Stationnement interdit 3h-6h" }
  },
  {
    id: "p5",
    name: { en: "Complexe Desjardins", fr: "Complexe Desjardins" },
    location: { lat: 45.5072, lng: -73.5628 },
    type: { en: "Garage", fr: "Garage" },
    price: { en: "$22/day", fr: "22$/jour" },
    availability: 67,
    totalSpots: 350,
    isFree: false,
    distance: "450m",
    restrictions: { en: "Closes at midnight", fr: "Ferme à minuit" }
  }
];

interface MapProps {
  onParkingSelect: (spot: ParkingSpot) => void;
  filters: {
    free: boolean;
    paid: boolean;
    available: boolean;
  };
}

export interface ParkingSpot {
  id: string;
  name: { en: string; fr: string };
  location: { lat: number; lng: number };
  type: { en: string; fr: string };
  price: { en: string; fr: string };
  availability: number;
  totalSpots: number;
  isFree: boolean;
  distance: string;
  restrictions: { en: string; fr: string };
}

const Map = ({ onParkingSelect, filters }: MapProps) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>(INITIAL_PARKING_SPOTS);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const language = 'en'; // In a real app, this would be from context or user settings

  // Filter parking spots based on selected filters
  const filteredSpots = parkingSpots.filter(spot => {
    if (filters.available && spot.availability === 0) return false;
    if (filters.free && !spot.isFree) return false;
    if (filters.paid && spot.isFree) return false;
    return true;
  });

  // Simulate fetching updated parking data
  const refreshParkingData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would be an API call
      const updatedSpots = parkingSpots.map(spot => ({
        ...spot,
        availability: Math.floor(Math.random() * (spot.totalSpots + 1))
      }));
      
      setParkingSpots(updatedSpots);
      setIsLoading(false);
      
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      toast({
        title: "Parking data updated",
        description: `Last refreshed at ${timeString}`,
        duration: 2000
      });
    }, 1500);
  };

  // Auto-refresh parking data every 60 seconds
  useEffect(() => {
    const intervalId = setInterval(refreshParkingData, 60000);
    
    // Initial data fetch
    refreshParkingData();
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot.id);
    onParkingSelect(spot);
  };

  return (
    <div className="relative w-full h-full bg-montreal-lightGray overflow-hidden rounded-lg">
      {/* Mocked map background - in a real app this would be a map integration */}
      <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-73.567,45.505,13,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbDBibXczbXUxdDliM2pzOGoyY3VrYWRjIn0.mYZfKTS0ZK47eSThZWvR2g')] bg-cover bg-center">
        {/* Mocked map elements would go here */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            className="p-3 bg-white montreal-shadow rounded-full hover-scale"
            onClick={() => {
              refreshParkingData();
              toast({
                title: "Finding your location",
                description: "Centering map on your current position",
                duration: 2000
              });
            }}
            aria-label="Center map on my location"
          >
            <Navigation className="w-5 h-5 text-montreal-darkGray" />
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="px-4 py-2 bg-white rounded-full montreal-shadow flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-montreal-teal animate-pulse"></div>
              <span className="text-sm font-medium">Updating...</span>
            </div>
          </div>
        )}

        {/* Parking pins */}
        <div className="absolute inset-0">
          {filteredSpots.map((spot) => {
            // Position pins based on lat/lng - this is just a mockup
            // In a real app, you'd use the map's projection to convert lat/lng to pixels
            const style: React.CSSProperties = {
              position: 'absolute',
              left: `${((spot.location.lng + 73.57) * 1000) % 95}%`,
              top: `${((spot.location.lat - 45.5) * 1000) % 95}%`,
              transform: 'translate(-50%, -50%)'
            };
            
            return (
              <div
                key={spot.id}
                style={style}
                onClick={() => handleSpotClick(spot)}
                className={cn(
                  'pin',
                  spot.availability === 0 ? 'pin-full' :
                  spot.isFree ? 'pin-free' : 'pin-paid',
                  selectedSpot === spot.id ? 'scale-125 shadow-lg' : '',
                  spot.availability === 0 ? 'opacity-60' : 'cursor-pointer hover:scale-110'
                )}
              >
                <MapPinIcon className={cn(
                  "w-5 h-5",
                  selectedSpot === spot.id ? 'animate-pulse' : ''
                )} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg montreal-shadow">
        <div className="text-xs font-semibold mb-1">Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-montreal-teal"></div>
          <span className="text-xs">Free parking</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-montreal-blue"></div>
          <span className="text-xs">Paid parking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-xs">Full (no spots)</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
