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
    <div className="table-container">
      <h2>Listagem de Contatos</h2>
      <button
        onClick={() => navigate({ to: '/cadastrar' })}
        className="btn-add"
      >
        Cadastrar Novo Contato
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                <button
                  onClick={() => handleEditClick(contact.id)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(contact.id)}
                  className="btn-delete"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
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

export default Listagem;
