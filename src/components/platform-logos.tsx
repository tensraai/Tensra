import type { ReactNode } from "react";
import netsuiteLogo from "@/assets/netsuite-logo.png";
import dynamics365Icon from "@/assets/dynamics365-icon.svg";
import { BRAND_MARKS } from "@/lib/platform-icons";

function Mark({ id, className = "size-5" }: { id: string; className?: string }) {
  const mark = BRAND_MARKS[id];
  if (!mark) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill={mark.color} aria-hidden="true">
      <path d={mark.d} />
    </svg>
  );
}

export type Platform = { name: string; mark: ReactNode; label?: boolean; fullColor?: boolean };

/** Order mirrors STACK in src/lib/content.ts. */
export const PLATFORMS: Platform[] = [
  { name: "NetSuite", mark: <img src={netsuiteLogo} alt="NetSuite" className="h-4 w-auto max-w-none shrink-0" />, label: false, fullColor: true },
  { name: "Salesforce", mark: <Mark id="salesforce" /> },
  { name: "Microsoft Dynamics 365", mark: <img src={dynamics365Icon} alt="" className="h-5 w-auto max-w-none shrink-0" /> },
  { name: "SAP Business One", mark: <Mark id="sap" /> },
  { name: "HubSpot", mark: <Mark id="hubspot" /> },
  { name: "QuickBooks", mark: <Mark id="quickbooks" /> },
  { name: "Xero", mark: <Mark id="xero" /> },
  { name: "PostgreSQL", mark: <Mark id="postgresql" /> },
  { name: "OpenAI", mark: <Mark id="openai" /> },
  { name: "Gemini", mark: <Mark id="googlegemini" /> },
];
