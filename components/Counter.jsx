import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Counter({ count, label, type, setCounts }) {
  return (
    <Box className="mx-4 p-2 w-32 text-slate-800 flex gap-2 flex-col text-center items-center   ">
      <Typography className="">{label}</Typography>
      <Box className="h-10 w-full flex items-center justify-around border-[1px] rounded-md border-blue-200 bg-blue-100">
        <IconButton
          p={2}
          color="primary"
          size="small"
          onClick={() =>
            setCounts({
              ...count,
              [type]: count[type] + 1,
            })
          }
        >
          +{/* <AddCircleOutlineIcon /> */}
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography className="">{count[type]}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton
          disabled={count[type] < 1 ? true : false}
          color="primary"
          size="small"
          onClick={() =>
            setCounts({
              ...count,
              [type]: count[type] - 1,
            })
          }
        >
          -{/* <RemoveCircleOutlineIcon /> */}
        </IconButton>
      </Box>
    </Box>
  );
}

export default Counter;
