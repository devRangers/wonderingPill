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
import { URL_WITHOUT_HEADER, SILENT_REFRESH_TIME } from "@utils/constant";
import { SigninResponse as CurrentUserResponse } from "@modelTypes/signinResponse";
import { RefreshResponse } from "@modelTypes/refreshResponse";
import Header from "@header/Header";
import Footer from "@footer/Footer";

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const getAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
      {
        credentials: "include",
      },
    );
    const result: RefreshResponse = await res.json();

    if (result.statusCode >= 400) {
      throw new Error(result.message);
    }
    return result;
  } catch (err) {}
};

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
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current`,
          { credentials: "include" },
        );
        const result: CurrentUserResponse = await res.json();

        if (result.statusCode === 200) {
          setUser(result.user);
          getAccessToken();
        } else {
          throw new Error(result.message);
        }
      } catch (err) {}
    }
    getUsers();
  }, []);

  // refresh token이 있을 경우 access token 주기적으로 재발급
  useEffect(() => {
    const timer = setInterval(() => getAccessToken(), SILENT_REFRESH_TIME);

    return () => {
      clearTimeout(timer);
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
