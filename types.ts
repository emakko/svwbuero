import { ReactNode } from "react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface StepItem {
  id: number;
  title: string;
  description: string;
}