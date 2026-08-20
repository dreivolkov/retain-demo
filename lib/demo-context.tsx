"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EMPTY_PROSPECT, type ProspectProfile } from "@/types/prospect";

const STORAGE_KEY = "retain-demo-prospect";

interface DemoContextValue {
  prospect: ProspectProfile;
  setProspect: (next: ProspectProfile) => void;
  updateProspect: (patch: Partial<ProspectProfile>) => void;
  clearProspect: () => void;
  hydrated: boolean;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [prospect, setProspectState] = useState<ProspectProfile>(EMPTY_PROSPECT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProspectState({ ...EMPTY_PROSPECT, ...JSON.parse(raw) });
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  const setProspect = (next: ProspectProfile) => {
    setProspectState(next);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const updateProspect = (patch: Partial<ProspectProfile>) => {
    setProspectState((prev) => {
      const next = { ...prev, ...patch };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearProspect = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setProspectState(EMPTY_PROSPECT);
  };

  const value = useMemo(
    () => ({ prospect, setProspect, updateProspect, clearProspect, hydrated }),
    [prospect, hydrated]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
