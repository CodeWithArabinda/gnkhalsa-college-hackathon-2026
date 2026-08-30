import "tailwindcss/tailwind.css";
import "@/styles/main.css";

import { AppProps } from "next/app";
import { PortfolioProvider } from "@/contexts/PortfolioContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PortfolioProvider portfolio={(pageProps as any)?.portfolio || (pageProps as any)?.portfolioData}>
      <Component {...pageProps} />
    </PortfolioProvider>
  );
}
