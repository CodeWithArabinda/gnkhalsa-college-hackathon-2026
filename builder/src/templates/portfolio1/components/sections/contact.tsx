"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio1/components/ui/card";
import ContactForm from "../ContactForm";
import { usePortfolio } from "@portfolio1/contexts/PortfolioContext";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  const { config } = usePortfolio();
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader id='contact' className="relative mb-14" title={
        <>
          LET&apos;S WORK <br />
          TOGETHER
        </>} />
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999] mx-4">
        <Card className="min-w-7xl surface-card text-slate-100 rounded-2xl mt-10 md:mt-16 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Send a Message</CardTitle>
            <CardDescription className="text-slate-400 text-sm sm:text-base mt-1">
              Prefer direct email? Reach out at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-emerald-400 font-mono underline hover:text-emerald-300 transition-colors"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
