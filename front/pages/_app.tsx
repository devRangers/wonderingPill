import "../styles/globals.css";
import "../styles/reset.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "@utils/styletron";
import { useAtom } from "jotai";
import { userAtom } from "@atom/userAtom";
import * as Api from "@api";
import { SigninResponse as CurrentUserResponse } from "@modelTypes/signinResponse";
import { RefreshResponse } from "@modelTypes/refreshResponse";
import { URL_WITHOUT_HEADER, SILENT_REFRESH_TIME } from "@utils/constant";
import Header from "@header/Header";
import Footer from "@footer/Footer";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [queryClient] = useState(() => new QueryClient());

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

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
        await Api.get<RefreshResponse>("/auth/refresh");
        const { user } = await Api.get<CurrentUserResponse>("/auth/current");
        setUser(user);
      } catch (err) {}
    }
    getUsers();
  }, []);

  // refresh token이 있을 경우 access token 주기적으로 재발급
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        if (document.hasFocus()) {
          await Api.get<RefreshResponse>("/auth/refresh");
        }
      } catch (err) {}
    }, SILENT_REFRESH_TIME);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyletronProvider value={styletron}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <CookiesProvider>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
            </Head>
            <ToastContainer theme="colored" position="top-center" limit={3} />
            {!URL_WITHOUT_HEADER.includes(router.pathname) && <Header />}
            <Component {...pageProps} />
            {!URL_WITHOUT_HEADER.includes(router.pathname) && <Footer />}
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </CookiesProvider>
        </Hydrate>
      </QueryClientProvider>
    </StyletronProvider>
  );
}
export default MyApp;
