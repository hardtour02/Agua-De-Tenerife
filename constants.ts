import { Alarm, Widget } from './types';

export const initialAlarms: Alarm[] = [
  { id: 'ALM-001', asset: 'Depósito Sur', status: 'Activa', date: '29/09/2023 10:45', read: false },
  { id: 'ALM-002', asset: 'Bomba Principal', status: 'Activa', date: '29/09/2023 09:12', read: false },
  { id: 'ALM-003', asset: 'Válvula Sector 3', status: 'Resuelta', date: '28/09/2023 15:30', read: true },
  { id: 'ALM-004', asset: 'Depósito Norte', status: 'Activa', date: '29/09/2023 11:02', read: true },
  { id: 'ALM-005', asset: 'Sensor de Presión 1', status: 'Resuelta', date: '27/09/2023 08:00', read: true },
  { id: 'ALM-006', asset: 'Depósito Central', status: 'Resuelta', date: '28/09/2023 18:20', read: true },
];


export const initialWidgets: Widget[] = [
    { id: 1, variable: 'Caudal', type: 'Line', name: 'Caudal (L/s)', color: '#4EC8E8', unit: 'L/s' },
    { id: 2, variable: 'Presión', type: 'Bar', name: 'Presión (bar)', color: '#00C8A0', unit: 'bar' },
];

export const flowData = [
    { time: '00:00', value: 120 }, { time: '01:00', value: 125 }, { time: '02:00', value: 130 },
    { time: '03:00', value: 128 }, { time: '04:00', value: 122 }, { time: '05:00', value: 135 },
    { time: '06:00', value: 150 }, { time: '07:00', value: 180 }, { time: '08:00', value: 210 },
    { time: '09:00', value: 200 }, { time: '10:00', value: 190 }, { time: '11:00', value: 185 },
    { time: '12:00', value: 195 }, { time: '13:00', value: 188 }, { time: '14:00', value: 175 },
    { time: '15:00', value: 165 }, { time: '16:00', value: 170 }, { time: '17:00', value: 180 },
    { time: '18:00', value: 205 }, { time: '19:00', value: 195 }, { time: '20:00', value: 170 },
    { time: '21:00', value: 150 }, { time: '22:00', value: 140 }, { time: '23:00', value: 130 },
];

export const pressureData = [
    { time: '00:00', value: 5.5 }, { time: '01:00', value: 5.6 }, { time: '02:00', value: 5.7 },
    { time: '03:00', value: 5.6 }, { time: '04:00', value: 5.5 }, { time: '05:00', value: 5.8 },
    { time: '06:00', value: 6.0 }, { time: '07:00', value: 6.2 }, { time: '08:00', value: 6.5 },
    { time: '09:00', value: 6.4 }, { time: '10:00', value: 6.2 }, { time: '11:00', value: 6.1 },
    { time: '12:00', value: 6.0 }, { time: '13:00', value: 5.9 }, { time: '14:00', value: 5.8 },
    { time: '15:00', value: 5.7 }, { time: '16:00', value: 5.8 }, { time: '17:00', value: 5.9 },
    { time: '18:00', value: 6.1 }, { time: '19:00', value: 6.0 }, { time: '20:00', value: 5.8 },
    { time: '21:00', value: 5.7 }, { time: '22:00', value: 5.6 }, { time: '23:00', value: 5.5 },
];

export const tankData = [
    { name: 'Llenos', value: 8, fill: '#00C8A0' },
    { name: 'Vacíos', value: 2, fill: '#FFD700' },
];

export const assetStatusData = [
    { name: 'Depósito Norte', status: 'Normal' },
    { name: 'Depósito Sur', status: 'Alarma' },
    { name: 'Bomba Principal', status: 'Alarma' },
    { name: 'Válvula Sector 3', status: 'Normal' },
    { name: 'Depósito Central', status: 'Normal' },
    { name: 'Planta de Tratamiento', status: 'Normal' },
    { name: 'Red de Distribución Este', status: 'Mantenimiento' },
];