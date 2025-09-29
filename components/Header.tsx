
import React, { useState, useMemo } from 'react';
import { AlarmIcon, LogoutIcon } from './icons';
import { Alarm } from '../types';

interface HeaderProps {
  alarms: Alarm[];
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  unreadAlarmsCount: number;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ alarms, setAlarms, unreadAlarmsCount, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeAlarms = useMemo(() => {
    return alarms.filter(alarm => alarm.status === 'Activa').sort((a, b) => (a.read === b.read) ? 0 : a.read ? 1 : -1);
  }, [alarms]);

  const handleMarkAsRead = (alarmId: string) => {
    setAlarms(prevAlarms =>
      prevAlarms.map(alarm =>
        alarm.id === alarmId ? { ...alarm, read: true } : alarm
      )
    );
  };
  
  return (
    <header className="bg-sidebar h-16 flex items-center justify-end px-6 shadow-md z-10">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <AlarmIcon className="w-6 h-6 text-text-secondary hover:text-white cursor-pointer" />
            {unreadAlarmsCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-alarm-red text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-sidebar">
                {unreadAlarmsCount}
              </span>
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-card-panel rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-700">
                <h3 className="font-semibold text-white">Alarmas Activas</h3>
              </div>
              <ul className="max-h-96 overflow-y-auto">
                {activeAlarms.length > 0 ? activeAlarms.map(alarm => (
                  <li key={alarm.id} className={`p-3 border-b border-gray-800 ${!alarm.read ? 'bg-background-main' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        {!alarm.read && <div className="w-2.5 h-2.5 bg-water-blue rounded-full mt-1.5 mr-3 flex-shrink-0"></div>}
                        <div className={alarm.read ? "ml-[22px]" : ""}>
                            <p className="font-semibold text-white">{alarm.asset}</p>
                            <p className="text-xs text-text-secondary">{alarm.date}</p>
                        </div>
                      </div>
                      {!alarm.read && (
                        <button 
                          onClick={() => handleMarkAsRead(alarm.id)} 
                          className="text-xs text-water-blue hover:underline font-semibold whitespace-nowrap ml-2"
                        >
                          Marcar Leído
                        </button>
                      )}
                    </div>
                  </li>
                )) : (
                  <li className="p-4 text-center text-text-secondary">
                    No hay alarmas activas.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-graph-blue-primary flex items-center justify-center font-bold text-white">
                A
            </div>
            <div className="text-right">
                <p className="font-semibold text-sm text-text-primary">Admin</p>
                <p className="text-xs text-text-secondary">Operador</p>
            </div>
        </div>
        <button onClick={onLogout} className="text-text-secondary hover:text-white transition-colors duration-200">
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;