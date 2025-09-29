
import React, { useState, useCallback, useMemo } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AlarmsPage from './pages/AlarmsPage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Page, Alarm } from './types';
import { initialAlarms } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentPage(Page.Dashboard);
  }, []);

  const unreadAlarmsCount = useMemo(() => {
    return alarms.filter(alarm => alarm.status === 'Activa' && !alarm.read).length;
  }, [alarms]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <DashboardPage />;
      case Page.Alarms:
        return <AlarmsPage alarms={alarms} setAlarms={setAlarms} />;
      case Page.History:
        return <HistoryPage />;
      case Page.Settings:
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background-main text-text-primary font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            alarms={alarms} 
            setAlarms={setAlarms}
            unreadAlarmsCount={unreadAlarmsCount} 
            onLogout={handleLogout} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-main p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;