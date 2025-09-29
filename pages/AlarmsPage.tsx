import React, { useState, useMemo } from 'react';
import { Alarm, AlarmStatus } from '../types';
import { PlusIcon } from '../components/icons';

type FilterType = 'Activas' | 'Resueltas' | 'Histórico';

const getStatusBadge = (status: AlarmStatus) => {
  switch (status) {
    case 'Activa':
      return <span className="bg-alarm-red/20 text-alarm-red px-3 py-1 text-sm font-semibold rounded-full">⚠️ Activa</span>;
    case 'Resuelta':
      return <span className="bg-sustainable-green/20 text-sustainable-green px-3 py-1 text-sm font-semibold rounded-full">✅ Resuelta</span>;
    default:
      return null;
  }
};

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sustainable-green"></div>
    </label>
  );
};

interface AlarmsPageProps {
    alarms: Alarm[];
    setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
}

const AlarmsPage: React.FC<AlarmsPageProps> = ({ alarms, setAlarms }) => {
  const [filter, setFilter] = useState<FilterType>('Activas');

  const filteredAlarms = useMemo(() => {
    if (filter === 'Histórico') return alarms;
    return alarms.filter(alarm => alarm.status === filter.slice(0, -1));
  }, [alarms, filter]);

  const handleToggleStatus = (alarmId: string) => {
    setAlarms(prevAlarms =>
      prevAlarms.map(alarm =>
        alarm.id === alarmId
          ? { ...alarm, status: alarm.status === 'Activa' ? 'Resuelta' : 'Activa' }
          : alarm
      )
    );
  };

  const FilterButton: React.FC<{ label: FilterType }> = ({ label }) => {
    const isActive = filter === label;
    return (
      <button
        onClick={() => setFilter(label)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isActive ? 'bg-graph-blue-primary text-white' : 'bg-card-panel text-text-secondary hover:bg-opacity-80'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="bg-card-panel p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestión de Alarmas</h2>
        <button className="flex items-center bg-graph-blue-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300">
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear nueva alarma
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <FilterButton label="Activas" />
        <FilterButton label="Resueltas" />
        <FilterButton label="Histórico" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-text-secondary">ID</th>
              <th className="p-4 text-sm font-semibold text-text-secondary">Activo</th>
              <th className="p-4 text-sm font-semibold text-text-secondary">Estado</th>
              <th className="p-4 text-sm font-semibold text-text-secondary">Fecha y Hora</th>
              <th className="p-4 text-sm font-semibold text-text-secondary text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlarms.map((alarm) => (
              <tr key={alarm.id} className="border-b border-gray-800 hover:bg-background-main">
                <td className="p-4 text-text-secondary font-mono text-sm">{alarm.id}</td>
                <td className="p-4 text-white font-medium">{alarm.asset}</td>
                <td className="p-4">{getStatusBadge(alarm.status)}</td>
                <td className="p-4 text-text-secondary">{alarm.date}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-4">
                    {filter !== 'Histórico' && (
                      <>
                        <ToggleSwitch
                          checked={alarm.status === 'Activa'}
                          onChange={() => handleToggleStatus(alarm.id)}
                        />
                        <button className="text-water-blue font-semibold hover:underline text-sm">Configurar</button>
                      </>
                    )}
                    <button className="text-text-secondary font-semibold hover:underline text-sm">Ver</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlarmsPage;