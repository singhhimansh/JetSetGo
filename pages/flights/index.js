import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { SearchableInput } from "@/components/SearchInput";
import { AirportLabel } from "@/components/AirportLabel";
import SyncIcon from "@mui/icons-material/Sync";
import { DatePicker } from "@mui/x-date-pickers";
import Counter from "@/components/Counter";
import { FlightSVG } from "@/components/FlightSVG";
import { FlightDetailsCard } from "@/components/FlightDetailsCard";

export default function Home() {
  const router = useRouter();

  const [airports, setAirports] = useState([]);
  const [queryAirlinesDetails, setQueryAilinesDetails] = useState([]);
  console.log({ airports });
  const getAirports = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/airports");
      // const res = await fetch("https://api.npoint.io/378e02e8e732bb1ac55b");
      console.log(res);
      const data = await res.json();
      setAirports(data.data.airports);
      //   return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAirports();
  }, []);

  const airportsOptions = useMemo(() => {
    console.log("airports inside", { airports });
    if (airports && airports.length) {
      return airports.map((airport) => ({
        label: airport.city,
        value: airport.city,
        code: airport.code,
      }));
    }
  }, [airports]);

  const fetchAirlines = async () => {
    console.log("fetching airlines");
    try {
      const res = await fetch("https://api.npoint.io/378e02e8e732bb1ac55b");
      console.log(res);
      const data = await res.json();
      const filteredData = (data || []).filter((flight) => {
        return (
          flight.origin === fromAirport.value &&
          flight.destination === toAirport.value &&
          flight.departureTime.includes(departureOn) &&
          flight.seatsAvailable >
            passangerCounts.adult + passangerCounts.children
        );
      });
      setQueryAilinesDetails(filteredData);
      console.log({ data, filteredData, fromAirport, toAirport, departureOn });
      //   return data;
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ airportsOptions });

  const [fromAirport, setFromAirport] = useState(airportsOptions?.[0].value);
  const [toAirport, setToAirport] = useState(airportsOptions?.[1].value);
  const [departureOn, setDeparture] = useState("");
  const [tripType, setTripType] = useState("oneWay");
  const [passangerCounts, setPassangerCounts] = useState({
    adult: 0,
    children: 0,
  });

  console.log({ fromAirport, departureOn });

  return (
    <Box className={`flex min-h-screen  flex-col items-center p-24`}>
      <Box className="min-w-96 max-w-[70%]">
        <Typography variant="h4">
          Book Domestic and International Flight Tickets
        </Typography>
        <Box className="p-10 my-10 rounded-md border-[1px] border-solid border-gray-300 shadow-lg shadow-slate-300">
          <Box className="flex flex-col gap-7">
            <Box>
              <Box className="flex gap-2  justify-between">
                <Box className="flex gap-2 items-center">
                  <Chip
                    variant="outlined"
                    icon={<RadioButtonCheckedIcon />}
                    label={"One way"}
                  />
                  <Chip
                    variant="outlined"
                    icon={<RadioButtonCheckedIcon />}
                    label={"Round trip"}
                  />
                </Box>
                <Box className="flex items-center">
                  <Counter
                    label={"Adults"}
                    type="adult"
                    count={passangerCounts}
                    setCounts={setPassangerCounts}
                  />
                  <Counter
                    label={"Children"}
                    type="children"
                    count={passangerCounts}
                    setCounts={setPassangerCounts}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              {airportsOptions && (
                <Box className="flex gap-2 items-center">
                  <SearchableInput
                    label="From"
                    value={fromAirport}
                    onChange={(value) => setFromAirport(value)}
                    options={airportsOptions}
                  />
                  <SyncIcon
                    className={`rotate-[-48deg] transition-all duration-500`}
                    onClick={() => {
                      // Rotate the component by 180 degrees
                      console.log("rotate", toAirport, fromAirport);
                      const temp = fromAirport;
                      setFromAirport(toAirport);
                      setToAirport(temp);
                    }}
                  />
                  <SearchableInput
                    label="To"
                    value={toAirport}
                    onChange={(value) => setToAirport(value)}
                    options={airportsOptions}
                    landing={true}
                  />
                </Box>
              )}
            </Box>
            <Box className="flex gap-2 items-center justify-between">
              <Box>
                <DatePicker
                  label="Departure"
                  onChange={(value) => setDeparture(value.format("YYYY-MM-DD"))}
                />
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  type="submit"
                  className="w-48 h-12 text-cyan-100 bg-blue-700 hover:bg-blue-800"
                  onClick={(e) => {
                    console.log("searching flights");
                    fetchAirlines();
                  }}
                >
                  Search flights
                </Button>
              </Box>
            </Box>
          </Box>

          {/* 

          // card search

          // filter 

          // table of flights

  //            [ {
  //     "id": 1,
  //     "gate": "A2",
  //     "price": 5000,
  //     "origin": "Delhi",
  //     "airline": "IndiGo",
  //     "aircraft": "Airbus A320",
  //     "duration": "3 hours",
  //     "arrivalTime": "2024-03-15T11:00:00",
  //     "destination": "Mumbai",
  //     "flightNumber": "6E101",
  //     "departureTime": "2024-03-15T08:00:00",
  //     "seatsAvailable": 120
  // }]

      
      */}
        </Box>
        {/* {queryAirlinesDetails && queryAirlinesDetails?.length > 0 && ( */}
        {true && <FlightDetailsCard flightsList={queryAirlinesDetails} />}
      </Box>
    </Box>
  );
}
