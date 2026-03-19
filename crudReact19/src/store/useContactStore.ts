import { create } from 'zustand';
import { Contact } from '../types/contact';
import initialContacts from '../data/contacts.json';

// Interface para o estado da store de contatos
interface ContactState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (updatedContact: Contact) => void;
  deleteContact: (id: string) => void;
  getContactById: (id: string) => Contact | undefined;
}

// Store do Zustand para gerenciar o CRUD de contatos
export const useContactStore = create<ContactState>((set, get) => ({
  // Inicializa o estado com os dados do arquivo JSON
  contacts: initialContacts,

  // Adiciona um novo contato à lista
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),

  // Atualiza um contato existente
  updateContact: (updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === updatedContact.id ? updatedContact : c
      ),
    })),

  // Remove um contato pelo ID
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),

  // Busca um contato específico pelo ID
  getContactById: (id) => {
    return get().contacts.find((c) => c.id === id);
  },
}));
