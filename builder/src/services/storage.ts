import { CanonicalPortfolio, PortfolioRecord } from "../types/portfolio";
import { normalizePortfolio } from "./normalizer";
import { SAMPLE_RESUMES } from "./sampleResumes";

const STORAGE_KEY_ACTIVE = "foliocraft_active_portfolio";
const STORAGE_KEY_RECORDS = "foliocraft_portfolio_records";
const BROADCAST_CHANNEL_NAME = "foliocraft_portfolio_sync";

let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
}

export function saveActivePortfolio(portfolio: CanonicalPortfolio): void {
  try {
    const serialized = JSON.stringify(portfolio);
    localStorage.setItem(STORAGE_KEY_ACTIVE, serialized);
    broadcastChannel?.postMessage({ type: "PORTFOLIO_UPDATED", payload: portfolio });
  } catch (err) {
    console.error("Failed to save active portfolio:", err);
  }
}

export function loadActivePortfolio(): CanonicalPortfolio {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return normalizePortfolio(parsed);
    }
  } catch (err) {
    console.warn("Failed to parse stored active portfolio:", err);
  }
  // Default to first sample preset
  return SAMPLE_RESUMES[0].portfolio;
}

export function subscribeToPortfolioSync(callback: (portfolio: CanonicalPortfolio) => void): () => void {
  if (!broadcastChannel) return () => {};

  const handler = (event: MessageEvent) => {
    if (event.data?.type === "PORTFOLIO_UPDATED" && event.data?.payload) {
      callback(normalizePortfolio(event.data.payload));
    }
  };

  broadcastChannel.addEventListener("message", handler);

  // Also listen for storage event
  const storageHandler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY_ACTIVE && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        callback(normalizePortfolio(parsed));
      } catch {}
    }
  };

  window.addEventListener("storage", storageHandler);

  return () => {
    broadcastChannel?.removeEventListener("message", handler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function getSavedPortfolios(): PortfolioRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        return list.map((item) => ({
          ...item,
          portfolio: normalizePortfolio(item.portfolio),
        }));
      }
    }
  } catch (err) {
    console.error("Failed to load saved portfolios:", err);
  }

  // Seed with initial sample records
  const initialRecords: PortfolioRecord[] = SAMPLE_RESUMES.map((sample, idx) => ({
    id: `record-${idx + 1}`,
    title: `${sample.name}'s Portfolio`,
    created_at: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    portfolio: sample.portfolio,
  }));

  savePortfolioRecords(initialRecords);
  return initialRecords;
}

export function savePortfolioRecords(records: PortfolioRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (err) {
    console.error("Failed to save portfolio records:", err);
  }
}
