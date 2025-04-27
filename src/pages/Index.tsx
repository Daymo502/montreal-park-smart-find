
import React, { useState } from 'react';
import Map, { ParkingSpot } from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import ParkingDetailSheet from '@/components/ParkingDetailSheet';
import Header from '@/components/Header';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedParking, setSelectedParking] = useState<ParkingSpot | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);
  const [filters, setFilters] = useState({
    free: false,
    paid: false,
    available: true
  });
  
  const handleSearch = (query: string) => {
    toast({
      title: "Searching for parking",
      description: `Near: ${query}`,
      duration: 2000
    });
  };
  
  const handleParkingSelect = (spot: ParkingSpot) => {
    setSelectedParking(spot);
    setIsDetailOpen(true);
  };
  
  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="flex flex-col h-screen bg-montreal-lightGray">
      {/* Top Section with Header and Search */}
      <div className="p-5 pt-8 pb-3 bg-white z-10">
        <Header 
          title="Montreal Park Smart" 
          subtitle="Find and navigate to available parking"
          className="mb-4"
        />
        <SearchBar 
          onSearch={handleSearch}
          onFilterToggle={() => setIsFilterBarVisible(!isFilterBarVisible)}
        />
        
        {/* Filter Bar - conditionally rendered */}
        {isFilterBarVisible && (
          <div className="mt-3 animate-fade-in">
            <FilterBar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </div>
        )}
      </div>
      
      {/* Map Section */}
      <div className="flex-grow relative">
        <Map 
          onParkingSelect={handleParkingSelect} 
          filters={filters}
        />
      </div>
      
      {/* Detail Sheet */}
      <ParkingDetailSheet
        parking={selectedParking}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
};

export default Index;
