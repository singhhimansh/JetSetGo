import React from "react";
import Image from "next/image";
import indigo from "../public/images/icons/6E.svg";
import vistara from "../public/images/icons/UK.svg";
import airAsia from "../public/images/icons/QP.svg";
import goAir from "../public/images/icons/IX.svg";
import airIndia from "../public/images/icons/AI.svg";
import spiceJet from "../public/images/icons/SG.svg";

export const FlightSVG = ({ name = "IndiGo" }) => {
  const svgPaths = {
    IndiGo: indigo,
    Vistara: vistara,
    SpiceJet: spiceJet,
    GoAir: goAir,
    AirAsia: airAsia,
    "Air India": airIndia,
  };

  return (
    <Image
      className="scale-150"
      src={svgPaths[name] || svgPaths["GoAir"]}
      alt={name}
    />
  );
};
