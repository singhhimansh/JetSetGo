import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Typography } from "@mui/material";
import { FlightSVG } from "./FlightSVG";

export const FlightDetailsCard = ({ flightsList }) => {
  return (
    <>
      {/* {flightsList && flightsList?.length > 0 && ( */}
      { true && (
        <Box className="flex flex-col w-full" >
          {[
            {
              id: 1,
              gate: "A2",
              price: 5000,
              origin: "Delhi",
              airline: "IndiGo",
              aircraft: "Airbus A320",
              duration: "3 hours",
              arrivalTime: "2024-03-15T11:00:00",
              destination: "Mumbai",
              flightNumber: "6E101",
              departureTime: "2024-03-15T08:00:00",
              seatsAvailable: 120,
            },
          ].map((flight, index) => {
            return (
              <Box key={flight.id} className="flex p-8 w-full  items-center h-32 bg-green-100 border-2 rounded-md border-gray-100 shadow-lg justify-between text-slate-700  ">
                <Box className="flex gap-5 items-center ">
                  <FlightSVG name={flight.airline} />
                  <Box className="flex-col justify-center">
                    <Typography className="font-bold">{flight.airline}</Typography>
                    <Typography className="text-xs">{flight.flightNumber}</Typography>
                  </Box>
                </Box>

                <Box className="flex items-center justify-center">
                  <Box className="flex-col items-center justify-center">
                    <Typography>
                      {flight.departureTime.split("T")[1]}
                    </Typography>
                    <Typography>{flight.origin}</Typography>
                  </Box>
                  <Box className="flex flex-col items-center justify-center text-xs">
                    <Typography className="text-xs">{flight.duration}</Typography>
                    <Divider orientation="horizontal" variant="" className="bg-grey-300 w-full" />
                    <Typography className="text-xs">Non-stop</Typography>
                  </Box>
                  <Box>
                    <Typography> {flight.arrivalTime.split("T")[1]}</Typography>
                    <Typography>{flight.destination}</Typography>
                  </Box>
                </Box>

                <Typography> ₹ {flight.price}</Typography>

                <Button>Book</Button>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

FlightDetailsCard.propTypes = {};
