// CinemaMarkers.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../data/cinemas";
import { useMapContext } from "./Map/context";
import { Marker } from "react-map-gl"; // <-- Import Marker here directly

const CinemaMarkers = () => {
  const { snapTo, setSelectedCinema } = useMapContext();
  const params = useParams();

  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      return allCinemas.filter(
        (cinema) =>
          (franchiseId === "all-cinemas" || cinema.franchise === franchiseId) &&
          cinema.countryCode === countryCode
      );
    }
    return allCinemas;
  }, [params]);

  return cinemas.map((cinema, idx) => (
    <Marker
      latitude={cinema.lat} // react-map-gl uses `latitude` and `longitude` props
      longitude={cinema.lng}
      key={idx}
      onClick={() => {
        snapTo(cinema.lat, cinema.lng);
        setSelectedCinema(cinema); // Updates side panel
      }}
    />
  ));
};

export default CinemaMarkers;
