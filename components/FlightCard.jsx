import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { FlightSVG } from "./FlightSVG";

export const FlightCard = ({ flight }) => {
  const getHHMMTime = (hhmmss) =>
    hhmmss.split("T")[1].split(":").slice(0, -1).join(":");
  return (
    <Box
      key={flight.id}
      className="flex p-8 w-full my-3  items-center h-28  bg-white bg-opacity-80 border-[1px] rounded-2xl border-sky-200 shadow-lg shadow-slate-100  justify-between text-slate-700 transition ease-out duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-300"
    >
      <Box className="flex gap-5 items-center ">
        <FlightSVG name={flight.airline} />
        <Box className="flex-col justify-center">
          <Typography className="font-bold">{flight.airline}</Typography>
          <Typography className="text-xs">{flight.flightNumber}</Typography>
        </Box>
      </Box>

      <Box className="flex items-center justify-center gap-4">
        <Box className=" flex flex-col items-center justify-center">
          <Typography className="text-xs">
            {getHHMMTime(flight.departureTime)}
          </Typography>
          <Typography className="text-xs">{flight.origin}</Typography>
        </Box>
        <Box className="flex flex-col items-center justify-center ">
          <Typography className="text-xs">{flight.duration}</Typography>
          <Divider
            orientation="horizontal"
            variant=""
            className="bg-grey-300 w-full"
          />
          <Typography className="text-xs">Non-stop</Typography>
        </Box>
        <Box className="flex flex-col items-center justify-center ">
          <Typography className="text-xs">
            {" "}
            {getHHMMTime(flight.arrivalTime)}
          </Typography>
          <Typography className="text-xs">{flight.destination}</Typography>
        </Box>
      </Box>
      <Box className="flex gap-5 items-center">
        <Typography className="font-semibold"> ₹{flight.price}</Typography>

        <Button onClick={()=> console.log('Booking confirmed with flight details: ',flight)} className="w-20 bg-red-700 hover:bg-red-800 text-gray-100 ">
          Book
        </Button>
      </Box>
    </Box>
  );
};
