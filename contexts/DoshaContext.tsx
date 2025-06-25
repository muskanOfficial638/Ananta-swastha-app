'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export type DoshaType =
  | "Vata"
  | "Pitta"
  | "Kapha"
  | "Vata-Pitta"
  | "Pitta-Kapha"
  | "Vata-Kapha"
  | "Tridosha"
  | null;

export type DoshaProfile = {
  primaryDosha: DoshaType;
  secondaryDosha?: DoshaType;
  balancedDosha?: DoshaType;
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  date: string;
};

export type AssessmentHistory = {
  id: string;
  date: string;
  result: DoshaType;
};

type DoshaContextType = {
  currentDosha: DoshaProfile | null;
  assessmentHistory: AssessmentHistory[];
  setCurrentDosha: (dosha: DoshaProfile) => void;
  addAssessmentToHistory: (assessment: AssessmentHistory) => void;
  clearAssessmentHistory: () => void;
};

const DoshaContext = createContext<DoshaContextType | undefined>(undefined);

export function DoshaProvider({ children }: { children: ReactNode }) {
  const [currentDosha, setCurrentDosha] = useState<DoshaProfile | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<
    AssessmentHistory[]
  >([]);

  const addAssessmentToHistory = (assessment: AssessmentHistory) => {
    setAssessmentHistory((prev) => [assessment, ...prev]);
  };

  const clearAssessmentHistory = () => {
    setAssessmentHistory([]);
  };

  return (
    <DoshaContext.Provider
      value={{
        currentDosha,
        assessmentHistory,
        setCurrentDosha,
        addAssessmentToHistory,
        clearAssessmentHistory,
      }}
    >
      {children}
    </DoshaContext.Provider>
  );
}

export function useDosha() {
  const context = useContext(DoshaContext);
  if (context === undefined) {
    throw new Error("useDosha must be used within a DoshaProvider");
  }
  return context;
}

export default DoshaProvider;
