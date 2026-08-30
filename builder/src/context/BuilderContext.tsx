import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from "react";
import { CanonicalPortfolio, PortfolioRecord, Project, Skill, Experience, Education, Achievement } from "../types/portfolio";
import { normalizePortfolio, createEmptyPortfolio } from "../services/normalizer";
import { saveActivePortfolio, loadActivePortfolio, getSavedPortfolios, savePortfolioRecords, subscribeToPortfolioSync } from "../services/storage";
import { SAMPLE_RESUMES } from "../services/sampleResumes";
import { generateId } from "../lib/utils";

interface BuilderContextType {
  portfolio: CanonicalPortfolio;
  setPortfolio: React.Dispatch<React.SetStateAction<CanonicalPortfolio>>;
  updatePortfolioField: <K extends keyof CanonicalPortfolio>(key: K, value: CanonicalPortfolio[K]) => void;
  updateNestedArray: <K extends "projects" | "skills" | "experiences" | "education" | "achievements">(
    arrayKey: K,
    updater: (prev: CanonicalPortfolio[K]) => CanonicalPortfolio[K]
  ) => void;
  savedRecords: PortfolioRecord[];
  activeRecordId: string | null;
  activeTab: "upload" | "editor" | "templates" | "preview" | "dashboard";
  setActiveTab: (tab: "upload" | "editor" | "templates" | "preview" | "dashboard") => void;
  editorSubTab: "profile" | "projects" | "skills" | "experience" | "education" | "achievements";
  setEditorSubTab: (tab: "profile" | "projects" | "skills" | "experience" | "education" | "achievements") => void;
  previewDevice: "desktop" | "tablet" | "mobile";
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  isExtracting: boolean;
  setIsExtracting: (val: boolean) => void;
  extractionProgressText: string;
  setExtractionProgressText: (text: string) => void;
  saveCurrentRecord: () => void;
  createNewPortfolio: () => void;
  loadRecordById: (id: string) => void;
  deleteRecordById: (id: string) => void;
  duplicateRecordById: (id: string) => void;
  loadSampleResume: (sampleId: string) => void;
  switchTemplate: (templateId: string) => void;
  openStandalonePreview: (templateId?: string) => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolioState] = useState<CanonicalPortfolio>(() => loadActivePortfolio());
  const [savedRecords, setSavedRecords] = useState<PortfolioRecord[]>(() => getSavedPortfolios());
  const [activeRecordId, setActiveRecordId] = useState<string | null>(() => {
    const list = getSavedPortfolios();
    return list.length > 0 ? list[0].id : null;
  });

  const [activeTab, setActiveTab] = useState<"upload" | "editor" | "templates" | "preview" | "dashboard">("editor");
  const [editorSubTab, setEditorSubTab] = useState<"profile" | "projects" | "skills" | "experience" | "education" | "achievements">("profile");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgressText, setExtractionProgressText] = useState("Analyzing resume...");
  const [, startTransition] = useTransition();

  // Debounced auto-save active portfolio to localStorage & sync across tabs
  useEffect(() => {
    const timer = setTimeout(() => {
      saveActivePortfolio(portfolio);
    }, 400);
    return () => clearTimeout(timer);
  }, [portfolio]);

  // Subscribe to real-time sync across other tabs
  useEffect(() => {
    const unsubscribe = subscribeToPortfolioSync((syncedPortfolio) => {
      startTransition(() => {
        setPortfolioState(syncedPortfolio);
      });
    });
    return unsubscribe;
  }, []);

  const setPortfolio = useCallback((updater: React.SetStateAction<CanonicalPortfolio>) => {
    setPortfolioState((prev) => {
      const next = typeof updater === "function" ? (updater as any)(prev) : updater;
      return normalizePortfolio(next);
    });
  }, []);

  const updatePortfolioField = useCallback(<K extends keyof CanonicalPortfolio>(key: K, value: CanonicalPortfolio[K]) => {
    setPortfolioState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateNestedArray = useCallback(<K extends "projects" | "skills" | "experiences" | "education" | "achievements">(
    arrayKey: K,
    updater: (prev: CanonicalPortfolio[K]) => CanonicalPortfolio[K]
  ) => {
    setPortfolioState((prev) => ({
      ...prev,
      [arrayKey]: updater(prev[arrayKey]),
    }));
  }, []);

  const saveCurrentRecord = useCallback(() => {
    const recordTitle = portfolio.full_name ? `${portfolio.full_name}'s Portfolio` : "Untitled Portfolio";
    const currentId = activeRecordId || generateId("rec");

    setSavedRecords((prev) => {
      const existingIdx = prev.findIndex((r) => r.id === currentId);
      const updatedRecord: PortfolioRecord = {
        id: currentId,
        title: recordTitle,
        created_at: existingIdx >= 0 ? prev[existingIdx].created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
        portfolio,
      };

      let nextList: PortfolioRecord[];
      if (existingIdx >= 0) {
        nextList = [...prev];
        nextList[existingIdx] = updatedRecord;
      } else {
        nextList = [updatedRecord, ...prev];
      }

      savePortfolioRecords(nextList);
      return nextList;
    });

    setActiveRecordId(currentId);
  }, [portfolio, activeRecordId]);

  const createNewPortfolio = useCallback(() => {
    const fresh = createEmptyPortfolio();
    setPortfolioState(fresh);
    const newId = generateId("rec");
    setActiveRecordId(newId);
    setActiveTab("upload");
  }, []);

  const loadRecordById = useCallback((id: string) => {
    const record = savedRecords.find((r) => r.id === id);
    if (record) {
      setPortfolioState(normalizePortfolio(record.portfolio));
      setActiveRecordId(record.id);
      setActiveTab("editor");
    }
  }, [savedRecords]);

  const deleteRecordById = useCallback((id: string) => {
    setSavedRecords((prev) => {
      const nextList = prev.filter((r) => r.id !== id);
      savePortfolioRecords(nextList);
      return nextList;
    });
    if (activeRecordId === id) {
      setActiveRecordId(null);
    }
  }, [activeRecordId]);

  const duplicateRecordById = useCallback((id: string) => {
    const record = savedRecords.find((r) => r.id === id);
    if (record) {
      const newRecord: PortfolioRecord = {
        id: generateId("rec"),
        title: `${record.title} (Copy)`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        portfolio: { ...record.portfolio },
      };
      setSavedRecords((prev) => {
        const nextList = [newRecord, ...prev];
        savePortfolioRecords(nextList);
        return nextList;
      });
    }
  }, [savedRecords]);

  const loadSampleResume = useCallback((sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId) || SAMPLE_RESUMES[0];
    setPortfolioState(normalizePortfolio(sample.portfolio));
    setActiveTab("editor");
  }, []);

  // CRITICAL: Switching template changes ONLY selected_template, leaving all user data intact!
  const switchTemplate = useCallback((templateId: string) => {
    setPortfolioState((prev) => ({
      ...prev,
      selected_template: templateId,
    }));
  }, []);

  const openStandalonePreview = useCallback((templateId?: string) => {
    const targetTemplate = templateId || portfolio.selected_template || "dark_developer";
    saveActivePortfolio({ ...portfolio, selected_template: targetTemplate });
    window.open(`/preview?template=${targetTemplate}`, "_blank");
  }, [portfolio]);

  return (
    <BuilderContext.Provider
      value={{
        portfolio,
        setPortfolio,
        updatePortfolioField,
        updateNestedArray,
        savedRecords,
        activeRecordId,
        activeTab,
        setActiveTab,
        editorSubTab,
        setEditorSubTab,
        previewDevice,
        setPreviewDevice,
        isExtracting,
        setIsExtracting,
        extractionProgressText,
        setExtractionProgressText,
        saveCurrentRecord,
        createNewPortfolio,
        loadRecordById,
        deleteRecordById,
        duplicateRecordById,
        loadSampleResume,
        switchTemplate,
        openStandalonePreview,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
