import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, useMap } from "react-map-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from "maplibre-gl";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { MapContextProvider } from "./context";
import { totalBounds } from "../../data/bounds";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
maplibregl.workerClass = maplibreglWorker;

const MaplibreMarker = ({ lat, lon, onClick }) => (
  <Marker longitude={lon} latitude={lat} anchor="bottom" onClick={onClick} />
);

const convertBounds = ([w, s, e, n]) => [
  [w, s],
  [e, n],
];

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap().current;

  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    console.log("executing `map.snapTo` event with maplibre");
    try {
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Unexpected error while attempting map navigation", {
        variant: "error",
      });
    }
  });

  return null;
};

const MaplibreMap = ({ children }) => {
  console.log("render Maplibre map");

  return (
    <Map
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds: convertBounds(totalBounds),
      }}
      padding={24}
    >
      <MapSnappingEventListener />
      <MapContextProvider
        value={{
          Marker: MaplibreMarker,
          snapTo: (lat, lng) => {
            const event = new CustomEvent("map.snapTo", {
              detail: { lat, lng },
            });
            window.dispatchEvent(event);
          },
        }}
      >
        {children}
      </MapContextProvider>
    </Map>
  );
};

export default MaplibreMap;
