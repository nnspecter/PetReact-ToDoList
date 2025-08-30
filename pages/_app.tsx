import React from "react";
import type { AppProps } from "next/app";
import TaskContextProvider from "../context/NewTaskContext";
import "./global.scss"
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <TaskContextProvider>
        <Component {...pageProps} />
      </TaskContextProvider>
  );
}

export default MyApp;
