/* Care */
import React, { FC } from "react";

/* Components */
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

/* Types */
import { IData } from "../../@types";

type Center = [number, number];
interface IProps {
  markups: IData[];
  center: Center;
}

const SetViewOnClick = ({ center }: { center: Center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
};

export const CustomMap: FC<IProps> = ({ markups, center }) => {
  return (
    <MapContainer
      maxZoom={100}
      style={{ height: "100vh" }}
      center={center}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markups[0] &&
        markups.map(({ id, from_lat, from_long, to_lat, to_long }) => (
          <Polyline
            key={id}
            positions={[
              [from_lat, from_long],
              [to_lat, to_long],
            ]}
            color={"black"}
          />
        ))}
      {markups[0] &&
        markups.map(({ id, from_lat, from_long, to_lat, to_long }) => (
          <React.Fragment key={id}>
            <Marker title="start" position={[from_lat, from_long]} />
            <Marker title="end" position={[to_lat, to_long]} />
          </React.Fragment>
        ))}
      <SetViewOnClick center={center} />
    </MapContainer>
  );
};
