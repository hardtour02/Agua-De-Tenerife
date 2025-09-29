
import React, { ReactNode } from 'react';
import { CloseIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-card-panel rounded-xl shadow-2xl w-full max-w-lg p-8 m-4 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-text-secondary hover:text-white"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
