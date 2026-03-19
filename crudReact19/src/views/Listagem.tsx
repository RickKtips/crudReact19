import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useContactStore } from '../store/useContactStore';
import Modal from '../components/Modal';

// View de Listagem de Contatos
const Listagem: React.FC = () => {
  const navigate = useNavigate();
  // Obtém a lista de contatos e a função de exclusão da store do Zustand
  const { contacts, deleteContact } = useContactStore();

  // Estados para gerenciar o modal de exclusão
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // Abre o modal de exclusão para um contato específico
  const handleDeleteClick = (id: string) => {
    setSelectedContactId(id);
    setIsDeleteModalOpen(true);
  };

  // Confirma a exclusão do registro
  const handleConfirmDelete = () => {
    if (selectedContactId) {
      deleteContact(selectedContactId);
      setIsDeleteModalOpen(false);
      setSelectedContactId(null);
    }
  };

  // Cancela a exclusão
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedContactId(null);
  };

  // Navega para a view de edição
  const handleEditClick = (id: string) => {
    navigate({ to: '/editar/$id', params: { id } });
  };

  return (
    <div>
      <h2>Listagem de Contatos</h2>
      <button
        onClick={() => navigate({ to: '/cadastrar' })}
        style={addButtonStyle}
      >
        Cadastrar Novo Contato
      </button>

      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Nome</th>
            <th style={cellStyle}>Telefone</th>
            <th style={cellStyle}>E-mail</th>
            <th style={cellStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} style={rowStyle}>
              <td style={cellStyle}>{contact.id}</td>
              <td style={cellStyle}>{contact.name}</td>
              <td style={cellStyle}>{contact.phone}</td>
              <td style={cellStyle}>{contact.email}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleEditClick(contact.id)}
                  style={editButtonStyle}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(contact.id)}
                  style={deleteButtonStyle}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '10px' }}>
                Nenhum contato encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de confirmação para exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Exclusão"
        message="deseja remover o registro?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

// Estilos básicos inline para a tabela e botões
const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  color: '#333',
};

const headerRowStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  borderBottom: '2px solid #ddd',
};

const rowStyle: React.CSSProperties = {
  borderBottom: '1px solid #ddd',
};

const cellStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
};

const addButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '20px',
};

const editButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#ffc107',
  color: 'black',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '8px',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Listagem;
