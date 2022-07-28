import "../styles/globals.css";
import "../styles/reset.css";
import { useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "common/header/Header";
import Footer from "common/footer/Footer";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "@utils/styletron";
import { ROUTE } from "@utils/constant";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const checkPathname = (pathname: string) => {
    if (ROUTE.CHECK_PATH.find((path) => pathname.includes(path) === true)) {
      return false;
    }
    return true;
  };

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

          {checkPathname(router.pathname) && <Header />}
          <Component {...pageProps} />
          {checkPathname(router.pathname) && <Footer />}

          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </StyletronProvider>
  );
}

export default MyApp;
