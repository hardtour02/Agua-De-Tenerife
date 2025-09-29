
import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-main p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-8">
            <svg viewBox="0 0 200 200" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#003366" d="M100 0A100 100 0 0 0 0 100a100 100 0 0 0 100 100 100 100 0 0 0 100-100A100 100 0 0 0 100 0zm0 180a80 80 0 1 1 80-80 80 80 0 0 1-80 80z"/>
                <path fill="#4EC8E8" d="M150 100a50 50 0 0 1-50 50c-22.3 0-41-14.5-47.6-34.5a50 50 0 0 1 47.6-65.5 50 50 0 0 1 50 50z"/>
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Aguas de Tenerife</h1>
        <p className="text-text-secondary mb-10">Monitorización Industrial SCADA</p>
        
        <button 
          onClick={onLogin} 
          className="w-full bg-corporate-blue text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 22.5H2.5V13.5H11.5V22.5ZM11.5 11.5H2.5V2.5H11.5V11.5ZM22.5 22.5H13.5V13.5H22.5V22.5ZM22.5 11.5H13.5V2.5H22.5V11.5Z"/>
            </svg>
            Iniciar sesión con Azure AD
        </button>
        
        <p className="text-sm text-inactive-gray mt-8">
          Acceso exclusivo para usuarios autorizados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
