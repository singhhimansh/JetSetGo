import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import { NoFlights } from "./NoFlight";
import { useRouter } from "next/router";
import { FlightCard } from "./FlightCard";

export const FlightDetailsCard = ({ flightsList, airlines , queryMade}) => {
  const router = useRouter();
  const [sorted, setSorted] = useState(null);

  const [checkedAirlines, setCheckedAirlines] = useState([]);

  //filtering
  const handleFilter = (airline) => {
    const newCheckedList = checkedAirlines.includes(airline)
      ? checkedAirlines.filter((item) => item != airline)
      : [...checkedAirlines, airline];

    let query = { ...router.query };
    if (newCheckedList.length) query.airline = newCheckedList.join();
    else delete query.airline;

    router.push({ url: router.pathname, query }, undefined, {
      shallow: true,
    });
    setCheckedAirlines(newCheckedList);
  };

  // sorting
  const handleSort = () => {
    let query = { ...router.query };
    if (sorted === null) query.sort = "cheapest";
    else query.sort = sorted ? "costliest" : "cheapest";
    router.push({ url: router.pathname, query }, undefined, { shallow: true });
    setSorted((i) => !i);
  };

  const computedList = useMemo(() => {
    let list = flightsList;
    // initially order kept same, consecutive clicks will sort the list
    list =
      sorted === null
        ? flightsList
        : list.sort((a, b) => (sorted ? 1 : -1) * (a.price - b.price));

    if (checkedAirlines && checkedAirlines.length) {
      list = list.filter((item) => checkedAirlines.includes(item.airline));
    }
    return list;
  }, [sorted, flightsList, checkedAirlines]);
  return (
    <>
      { queryMade && flightsList && flightsList.length ? (
        <Box className="h-full mb-32">
          {/* Sort Panel */}
          <Box className="flex px-10 py-3 w-full my-3  items-center h-12  bg-white bg-opacity-80 border-[1px] rounded-2xl border-sky-200 shadow-lg   text-slate-700 ">
            <Typography className="text-xs grow basis-[3/10] ">
              Airline
            </Typography>
            <Divider
              orientation="vertical"
              variant=""
              className="bg-grey-300 h-full"
              flexItem
            />
            <Typography className="text-xs grow basis-[1.3/10] ">
              Departure
            </Typography>
            <Divider
              orientation="vertical"
              variant=""
              className="bg-grey-300 h-full"
              flexItem
            />
            <Typography className="text-xs grow basis-[1.3/10]">
              Duration
            </Typography>
            <Divider
              orientation="vertical"
              variant=""
              className="bg-grey-300 h-full"
              flexItem
            />
            <Typography className="text-xs grow basis-[1.3/10]">
              Arrival
            </Typography>
            <Divider
              orientation="vertical"
              variant=""
              className="bg-grey-300 h-full"
              flexItem
            />
            <ButtonBase
              disableTouchRipple
              onClick={() => handleSort()}
              className="text-xs grow basis-[3/10]"
            >
              <Typography
                className={`text-xs ${
                  sorted ? "text-sky-700 font-semibold" : ""
                } `}
              >
                Price
              </Typography>{" "}
              <NorthIcon
                className={`scale-[0.60] transition-transform duration-75 ${
                  sorted ? " fill-sky-700" : "rotate-180"
                }`}
              />
            </ButtonBase>
          </Box>

          <Box className="relative">
            {/* Filter panel */}
            <Box className="absolute top-0 -left-60 flex flex-col p-5  w-48 my-3    bg-white bg-opacity-80 border-[1px] rounded-2xl border-sky-200 shadow-lg   text-slate-700 ">
              <Typography className="self-start">Filter</Typography>
              <Divider
                orientation="horizontal"
                variant=""
                className="bg-grey-300 w-full"
              />

              {airlines?.map((airline) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      disableFocusRipple
                      key={airline}
                      checked={checkedAirlines.includes(airline)}
                      onClick={(e) => handleFilter(airline)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={airline}
                  labelPlacement="end"
                />
              ))}
            </Box>
            {computedList && computedList?.length > 0 ? (
              <Box className="flex flex-col w-full">
                {computedList.map((flight, index) => {
                  return <FlightCard flight={flight} />;
                })}
              </Box>
            ) : (
              <NoFlights />
            )}
          </Box>
        </Box>
      ) : (
        queryMade && <NoFlights />
      )}
    </>
  );
};
