
import React from 'react';
import { HistoryIcon } from '../components/icons';

const HistoryPage: React.FC = () => {
  return (
    <div className="bg-card-panel p-6 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center">
      <HistoryIcon className="w-16 h-16 text-text-secondary mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Historial de Datos</h2>
      <p className="text-text-secondary max-w-md">
        Esta sección mostrará los registros históricos de datos de sensores y eventos del sistema. La funcionalidad está en desarrollo.
      </p>
    </div>
  );
};

export default HistoryPage;
