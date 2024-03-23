import React from "react";
import FlightIcon from "@mui/icons-material/Flight";

export const AirportLabel = ({ airport, option }) => {
  const { name, code, city } = airport;
  return (
    <div className="flex">
      <FlightIcon fill="blue" />
      <div>{name}</div>
      <div>{code}</div>
      <div>{city}</div>
    </div>
  );
};
