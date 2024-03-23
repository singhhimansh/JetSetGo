import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (router.route === "/") {
      timer= setTimeout(() => {
        router.push("/flights")
      }, 2000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-slate-50`}
    >
      <Box className="w-svw h-lvh flex justify-center items-center">
        <CircularProgress />
      </Box>

      {/* <img src="https://cdn.dribbble.com/users/328772/screenshots/10293847/media/d45c05b5e858e2508fb1a3b84f33e932.gif" style={{height:'40%', width:'40%', borderRadius:'50%',  boxShadow: '0px 40px 50px #00000001 #ECECEC' }} alt='flight'/>
       */}
    </main>
  );
}
