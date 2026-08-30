import React from "react";
import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SiteFrame>{children}</SiteFrame>
    </Providers>
  );
}
