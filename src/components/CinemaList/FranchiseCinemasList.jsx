import BaseCinemaList from "./BaseCinemaList";
import FranchiseHeader from "./FranchiseHeader";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../../data/cinemas";
import { useMapContext } from "../Map/context";

const FranchiseCinemasList = () => {
  const { franchiseId, countryCode } = useParams();
  const { selectedCinema } = useMapContext();

  const filteredCinemas = useMemo(() => {
    let cinemas = allCinemas.filter(
      (cinema) =>
        (franchiseId === "all-cinemas" || cinema.franchise === franchiseId) &&
        cinema.countryCode === countryCode
    );
    if (selectedCinema) {
      // Only show the clicked one
      return cinemas.filter((cinema) => cinema.id === selectedCinema.id);
    }
    return cinemas;
  }, [franchiseId, countryCode, selectedCinema]);

  return <BaseCinemaList cinemas={filteredCinemas} Header={FranchiseHeader} />;
};

export default FranchiseCinemasList;
