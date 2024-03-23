import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { SearchableInput } from "@/components/SearchInput";
import { AirportLabel } from "@/components/AirportLabel";

export default function Home() {
  const router = useRouter();

  const [airports, setAirports] = useState([]);
console.log({airports})
  const getAirports = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/airports");
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

  const airportsOptions=  useMemo(() =>{
    console.log('airports inside',{airports})
    if(airports && airports.length){
      return airports.map((airport)=>({
        label: airport.name,
        value: airport.code
      }));
    }
}, [airports]);

console.log({airportsOptions})

  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");

  return (
    <Box className={`flex min-h-screen flex-col items-center p-24`}>
      <Typography variant="h4">
        Book Domestic and International Flight Tickets
      </Typography>
      <Box className="min-w-96 max-w-[70%] p-10 m-3 rounded-md border-[1px] border-solid border-gray-500 shadow-lg shadow-slate-300">
        <Box className="flex-col">
          <Box>
            <Box className="flex gap-2">
              <Box className="flex gap-2">
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
              <Box>adults</Box>
            </Box>
          </Box>
          <Box>
            {airportsOptions && <SearchableInput 
                label='From'
                value={fromAirport}
                onChange={setFromAirport}
                options={airportsOptions}

            />}
          </Box>
          <Box className="flex gap-2">
            <Box>date</Box>
            <Box>search</Box>
          </Box>
        </Box>

        {/* 

          // card search

          // filter 

          // table of flights
      
      */}
      </Box>
    </Box>
  );
}
