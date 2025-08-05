// context.js
import { createContext, useContext, useState } from "react";
import { Marker } from "react-map-gl"; // <-- Import Marker here

const MapContext = createContext(null);

export const useMapContext = () => useContext(MapContext);

export const MapContextProvider = ({ children }) => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  const snapTo = (lat, lon) => {
    console.log(`Snapping to lat: ${lat}, lon: ${lon}`);
  };

  return (
    <MapContext.Provider
      value={{ snapTo, selectedCinema, setSelectedCinema, Marker }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
