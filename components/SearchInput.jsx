// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Box } from '@mui/material';


export const SearchableInput=({
    label,
    value,
    onChange,
    options,
    CustomLabel,
}) =>{
//   const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  console.log({options})
  return (
    <Box>
      <Autocomplete
        value={value}
        autoHighlight
        onChange={(event, newValue) => {
            onChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => <CustomLabel {...props} option={option} />}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Box>
  );
}