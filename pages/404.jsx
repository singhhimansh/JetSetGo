import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push("/flights");
  }, []);

  return (
    <Box className="w-screen h-screen flex justify-center align-middle py-[50vh] bg-slate-50">
      <Typography variant="h6">404 - Page Not Found</Typography>
    </Box>
  );
}
