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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={buttonContainerStyle}>
          <button onClick={onConfirm} style={confirmButtonStyle}>Sim</button>
          <button onClick={onCancel} style={cancelButtonStyle}>Não</button>
        </div>
      </div>
    </div>
  );
};

// Estilos básicos inline para o modal
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#333',
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const confirmButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#d9534f',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#5bc0de',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Modal;
