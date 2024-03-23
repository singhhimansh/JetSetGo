// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Box } from '@mui/material';
import { AirportLabel } from './AirportLabel';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';


export const SearchableInput=({
    label,
    value,
    onChange,
    options,
    landing= false,
    
}) =>{
//   const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  console.log({options})
  return (
    <Box>
      <Autocomplete
        value={value}
        autoHighlight
        onChange={(e, value) => {
          onChange(value);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.label + `  [${option.code}]`  }
        // getOptionLabel={(option) => (
        //   <Box>
        //     <FlightIcon fill="blue" />
        //     {option.label + "  " + option.value}
        //   </Box>
        // )}
        // renderOption={(props, option) => <AirportLabel {...props} option={option} />}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            landing ? <FlightLandIcon color="primary" fontSize="small" />  : <FlightTakeoffIcon color="primary" fontSize="small" />  
          ),
        }}
        label={label} />}
      />
    </Box>
  );
}