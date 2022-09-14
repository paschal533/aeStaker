import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { StakerProvider } from "../context/StakerContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StakerProvider>
        <Component {...pageProps} />
      </StakerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
