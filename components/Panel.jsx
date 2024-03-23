import React, { useCallback } from "react";
import {
  Alert,
  Button,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  Snackbar,
  SnackbarContent,
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
import { useEffect, useMemo, useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import Grow from "@mui/material/Grow";

export const Panel = ({ onQuery, airports, allFetchedData }) => {
  const [departureOn, setDeparture] = useState("");
  const [openError, setOpenError] = useState(false);
  const [passangerCounts, setPassangerCounts] = useState({
    adult: 0,
    children: 0,
  });
  const airportsOptions = useMemo(() => {
    if (airports && airports.length) {
      return airports.map((airport) => ({
        label: airport,
        value: airport,
      }));
    }
  }, [airports]);

  const [fromAirport, setFromAirport] = useState(airportsOptions?.[0].value);
  const [toAirport, setToAirport] = useState(airportsOptions?.[1].value);

  const queryAirlines = useCallback(() => {
    if (!(fromAirport && toAirport && passangerCounts.adult && departureOn)) {
      setOpenError(true);
      return;
    }
    onQuery([]);
    console.log("fetching airlines");
    try {
      //   const res = await fetch("http://localhost:3000/api/airlineQuery");
      //   const data = await res.json();
      const filteredData = (allFetchedData || []).filter((flight) => {
        return (
          flight.origin === fromAirport.value &&
          flight.destination === toAirport.value &&
          flight.departureTime.includes(departureOn) &&
          flight.seatsAvailable >
            passangerCounts.adult + passangerCounts.children
        );
      });
      onQuery(filteredData);
    } catch (error) {
      onQuery([]);
      console.log(error);
    }
  }, [
    onQuery,
    fromAirport,
    toAirport,
    departureOn,
    passangerCounts,
    allFetchedData,
  ]);

  return (
    <Box className="p-10 my-10 rounded-2xl border-[1px] bg-white bg-opacity-80 border-solid border-sky-200 shadow-lg shadow-slate-300">
      <Snackbar
        open={openError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="standard"
          sx={{ width: "100%" }}
        >
          One or more fields are missing. Please fill all the fields.
        </Alert>
      </Snackbar>
      <Box className="flex flex-col gap-7">
        <Box>
          <Box className="flex gap-2  justify-between">
            <Box className="flex gap-2 items-center">
              <Chip
                className="border-sky-700"
                variant="outlined"
                icon={<RadioButtonCheckedIcon className="fill-sky-800" />}
                label={"One way"}
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
              className="w-52 h-12 flex gap-3 text-nowrap text-cyan-100 bg-blue-700 hover:bg-blue-800"
              onClick={(e) => {
                queryAirlines();
              }}
            >
              Search flights <TelegramIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Panel;
