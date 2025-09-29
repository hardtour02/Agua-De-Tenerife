import React from 'react';
import { Page } from '../types';
import { DashboardIcon, AlarmIcon, HistoryIcon, SettingsIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, setCurrentPage, icon, label }) => {
  const isActive = currentPage === page;
  return (
    <li
      onClick={() => setCurrentPage(page)}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-graph-blue-primary text-white shadow-lg'
          : 'text-text-secondary hover:bg-card-panel hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 bg-sidebar p-4 flex-shrink-0 flex flex-col shadow-2xl">
      <div className="flex items-center justify-center h-16 mb-6">
        <img 
            src="https://i.imgur.com/gQfob3c.png" 
            alt="Logo de la empresa" 
            className="h-10"
            style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
      <nav className="flex-1">
        <ul>
          <NavItem
            page={Page.Dashboard}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<DashboardIcon className="w-6 h-6" />}
            label="Dashboard"
          />
          <NavItem
            page={Page.Alarms}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<AlarmIcon className="w-6 h-6" />}
            label="Alarmas"
          />
          <NavItem
            page={Page.History}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<HistoryIcon className="w-6 h-6" />}
            label="Historial"
          />
          <NavItem
            page={Page.Settings}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<SettingsIcon className="w-6 h-6" />}
            label="Configuración"
          />
        </ul>
      </nav>
      <div className="mt-auto text-center text-xs text-text-secondary">
        <p>&copy; 2025 Aguas de Tenerife, S.A.</p>
        <p>Versión 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;