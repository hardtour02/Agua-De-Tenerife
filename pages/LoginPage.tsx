
import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-main p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-8">
            <img 
                src="https://i.imgur.com/gQfob3c.png" 
                alt="Logo de la empresa" 
                className="w-48"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </div>
        <p className="text-2xl font-semibold text-text-secondary mb-10">Monitorización Industrial SCADA</p>
        
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