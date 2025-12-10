
export enum Sector {
  FINANCE = 'Financeiro',
  OPERATION = 'Operação'
}

export interface UserRegistrationData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sector: Sector;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
}

// Atualizado para as novas telas solicitadas
export type Screen = 'dashboard' | 'users' | 'protocol' | 'reports' | 'payees' | 'maturity' | 'freight_values';

// URL Centralizada da API do Google Apps Script
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxALoRVfzvwz6Gfl5xhfvshRGMs3f6E7DGamtXYCIZ0x-d8oynUiNd42JsDcuGrrPMhaw/exec";