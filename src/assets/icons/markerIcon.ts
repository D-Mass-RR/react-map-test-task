import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: require("./map-marker.svg"),
  iconRetinaUrl: require("./map-marker.svg"),
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export { markerIcon };
