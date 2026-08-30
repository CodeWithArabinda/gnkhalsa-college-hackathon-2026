import React from "react";
import SiteFrame from "@portfolio1/components/site-frame";
import { Providers } from "@portfolio1/components/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SiteFrame>{children}</SiteFrame>
    </Providers>
  );
}
