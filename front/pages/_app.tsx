import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "@utils/styletron";
import Head from "next/head";

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setScreenSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize());

    return () => {
      window.removeEventListener("resize", () => setScreenSize());
    };
  }, []);

  return (
    <StyletronProvider value={styletron}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </StyletronProvider>
  );
}

export default MyApp;
