import { Box, Typography } from '@mui/material';
import React from 'react';

export const NoFlights=() =>{
  return (
    <Box className="flex px-10 py-3 w-full my-3  justify-center items-center h-20  bg-white bg-opacity-80 border-[1px] rounded-2xl border-sky-200 shadow-lg text-slate-700 ">
    <Typography>No flights found.</Typography>
  </Box>
  )
};