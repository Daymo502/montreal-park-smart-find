
import React from 'react';
import { X, Star, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ParkingSpot } from './Map';

interface ParkingDetailSheetProps {
  parking: ParkingSpot | null;
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'fr';
}

const ParkingDetailSheet = ({ 
  parking, 
  isOpen, 
  onClose,
  language = 'en'
}: ParkingDetailSheetProps) => {
  const { toast } = useToast();

  if (!parking) {
    return null;
  }

  const handleFavorite = () => {
    toast({
      title: "Added to favorites",
      description: `${parking.name[language]} has been added to your favorites`,
      duration: 3000,
    });
  };

  const handleNavigate = () => {
    toast({
      title: "Starting navigation",
      description: `Directions to ${parking.name[language]} (${parking.distance} away)`,
      duration: 3000,
    });
  };

  return (
    <div className={cn(
      "bottom-sheet",
      isOpen ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="sheet-handle" />
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-montreal-darkGray">
            {parking.name[language]}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex items-center mt-1 text-sm text-gray-500">
          <span>{parking.type[language]}</span>
          <span className="mx-2">•</span>
          <span>{parking.distance}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500">Price</div>
            <div className={cn(
              "font-bold mt-1",
              parking.isFree ? "text-montreal-teal" : "text-montreal-darkGray"
            )}>
              {parking.price[language]}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500">Availability</div>
            <div className={cn(
              "font-bold mt-1",
              parking.availability === 0 ? "text-gray-400" : 
              parking.availability < 5 ? "text-montreal-red" : 
              "text-montreal-teal"
            )}>
              {parking.availability}/{parking.totalSpots}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500">Restrictions</div>
            <div className="font-medium text-xs mt-1 text-montreal-darkGray">
              {parking.restrictions[language]}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>When parking in Montreal, always check signs for specific rules and regulations that may apply to this location.</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleFavorite}
            className="secondary-button flex-1 flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4" />
            <span>Save</span>
          </button>
          
          <button
            onClick={handleNavigate}
            className="action-button flex-1 flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetailSheet;
