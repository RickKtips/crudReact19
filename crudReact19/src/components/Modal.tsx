import React from 'react';

// Props para o componente Modal
interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Componente de Modal simples para diálogos de confirmação
const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-confirm">Sim</button>
          <button onClick={onCancel} className="btn-cancel">Não</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
