
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPinIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-montreal-lightGray">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-montreal-teal bg-opacity-10 flex items-center justify-center">
            <MapPinIcon className="w-10 h-10 text-montreal-teal" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-montreal-darkGray">404</h1>
        <p className="text-xl text-gray-600 mb-6">Destination Not Found</p>
        <p className="text-gray-500 mb-8">We couldn't find the parking spot you're looking for. It seems this route doesn't exist.</p>
        <a href="/" className="action-button inline-flex">
          Return to Map
        </a>
      </div>
    </div>
  );
};

export default NotFound;
