import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FlightDetailsCard } from "@/components/AllFlightDetails";
import Panel from "@/components/Panel";

export default function Home() {
  const [queryAirlinesDetails, setQueryAilinesDetails] = useState([]);
  const [airports, setAirports] = useState([]);
  const [airlinesList, setAirlines] = useState([]);
  const [allFetchedDetails, setAllFetchedDetails] = useState([]);
  const [queryMade, setQueryMade] = useState(false);
  const handleSearchQuery = (list) => {
    setQueryMade(true);
    if (list && list.length > 0) setQueryAilinesDetails(list);
    else setQueryAilinesDetails([]);
  };
  // list of airports and airlines
  const getAllDetailsAirports = async () => {
    try {
      const res = await fetch("https://api.npoint.io/378e02e8e732bb1ac55b");
      const data = await res.json();
      const airportsSet = new Set();
      const airlinesSet = new Set();

      data.forEach((item) => {
        airportsSet.add(item.origin);
        airportsSet.add(item.destination);
        airlinesSet.add(item.airline);
      });
      
      setAirports(Array.from(airportsSet));
      setAirlines(Array.from(airlinesSet));
      setAllFetchedDetails(data);
      //   return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDetailsAirports();
  }, []);

  return (
    <Box className={`flex min-h-screen  flex-col items-center p-24`}>
      <Box className="min-w-96 max-w-[70%] text-center ">
        <Typography variant="h5">
          Book Domestic and International Flight Tickets
        </Typography>

        <Panel
          onQuery={handleSearchQuery}
          allFetchedData={allFetchedDetails}
          airports={airports}
        />
        <FlightDetailsCard
          flightsList={queryAirlinesDetails}
          airlines={airlinesList}
          queryMade={queryMade}
        />
      </Box>
    </Box>
  );
}
