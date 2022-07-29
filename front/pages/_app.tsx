import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as StyletronProvider } from "styletron-react";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
import { styletron } from "@utils/styletron";
import { URL_WITHOUT_HEADER } from "@utils/constant";
import Header from "@header/Header";
import Footer from "@footer/Footer";

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", () => setScreenSize());
    return () => {
      window.removeEventListener("resize", () => setScreenSize());
    };
  }, []);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current`,
        { credentials: "include" },
      );
      const result = await res.json();
      if (result.statusCode === 200) {
        setUser(result.user);
      }
    }
    getUsers();
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

          {!URL_WITHOUT_HEADER.includes(router.pathname) && <Header />}
          <Component {...pageProps} />
          {!URL_WITHOUT_HEADER.includes(router.pathname) && <Footer />}

          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </StyletronProvider>
  );
}

export default MyApp;
