import React from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { BuilderProvider, useBuilder } from "./context/BuilderContext";
import Navbar from "./components/navbar/Navbar";
import ResumeUploader from "./components/upload/ResumeUploader";
import PortfolioEditor from "./components/editor/PortfolioEditor";
import TemplateSelector from "./components/selector/TemplateSelector";
import LivePreviewFrame from "./components/preview/LivePreviewFrame";
import StandalonePreview from "./components/preview/StandalonePreview";
import DashboardView from "./components/dashboard/DashboardView";

function BuilderMain() {
  const { activeTab } = useBuilder();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {activeTab === "upload" && <ResumeUploader />}
        {activeTab === "editor" && <PortfolioEditor />}
        {activeTab === "templates" && <TemplateSelector />}
        {activeTab === "preview" && (
          <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-140px)]">
            <div className="h-full w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <LivePreviewFrame />
            </div>
          </div>
        )}
        {activeTab === "dashboard" && <DashboardView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/preview" element={<StandalonePreview />} />
        <Route
          path="*"
          element={
            <BuilderProvider>
              <BuilderMain />
            </BuilderProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
