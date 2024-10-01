import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router:NextRouter = useRouter();
  useEffect(() => {
    router.push('/auth/login');
  }, []);
  return <Component {...pageProps} />;
}
