export enum Page {
  Dashboard = 'Dashboard',
  Alarms = 'Alarmas',
  History = 'Historial',
  Settings = 'Configuración',
}

export type AlarmStatus = 'Activa' | 'Resuelta';

export interface Alarm {
  id: string;
  asset: string;
  status: AlarmStatus;
  date: string;
  read: boolean;
}

export type WidgetType = 'Line' | 'Bar' | 'Pie';
export type VariableType = 'Caudal' | 'Presión' | 'Temperatura';

export interface Widget {
    id: number;
    variable: VariableType;
    type: WidgetType;
    name: string;
    color?: string;
    unit?: string;
    scaleMin?: number;
    scaleMax?: number;
}