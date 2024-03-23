import React from "react";
import Image from "next/image";
import indigo from "../public/images/icons/6E.svg";

export const FlightSVG = ({ name= 'IndiGo' }) => {
    console.log({ name });
  const svgPaths = {
    IndiGo: indigo,
  };

  return (
      <Image className="scale-150" src={svgPaths[name]}  alt=""/>
  );
};
