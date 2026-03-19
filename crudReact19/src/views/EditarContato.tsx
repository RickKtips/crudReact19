import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IMaskInput } from 'react-imask';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useContactStore } from '../store/useContactStore';
import Modal from '../components/Modal';

// Esquema de validação idêntico ao de cadastro
const contactSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório').regex(/\(\d{2}\)\d{5}-\d{4}/, 'Formato inválido: (99)99999-9999'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// View de Edição de Contato
const EditarContato: React.FC = () => {
  const navigate = useNavigate();
  // Obtém o parâmetro 'id' da URL usando TanStack Router
  const { id } = useParams({ from: '/editar/$id' });
  // Obtém as funções e o contato da store do Zustand
  const { getContactById, updateContact } = useContactStore();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const contact = getContactById(id);

  // Configura o formulário, pré-preenchendo com os dados do contato
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  // Atualiza os valores do formulário quando o contato for carregado
  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
      });
    }
  }, [contact, reset]);

  // Se o contato não for encontrado, exibe uma mensagem ou redireciona
  if (!contact) {
    return (
      <div className="form-container">
        <h2>Contato não encontrado!</h2>
        <button onClick={() => navigate({ to: '/' })} className="btn-cancel">Voltar</button>
      </div>
    );
  }

  // Função chamada ao submeter a edição
  const onSubmit = (data: ContactFormData) => {
    updateContact({ ...data, id });
    navigate({ to: '/' });
  };

  // Função que abre o modal de cancelamento de edição
  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  // Confirmação no modal de cancelamento: volta para a listagem
  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    navigate({ to: '/' });
  };

  // Desistência de cancelar: fecha o modal e mantém na edição
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <div className="form-container">
      <h2>Editar Contato</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            {...register('name')}
            id="name"
            placeholder="Digite o nome"
          />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="phone">Telefone:</label>
          {/* Componente para máscara de entrada de telefone */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00)00000-0000"
                definitions={{
                  '0': /[0-9]/,
                }}
                id="phone"
                placeholder="(99)99999-9999"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            {...register('email')}
            id="email"
            placeholder="exemplo@email.com"
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div className="button-container">
          <button type="submit" className="btn-submit">Editar</button>
          <button type="button" onClick={handleCancelClick} className="btn-cancel">Cancelar</button>
        </div>
      </form>

      {/* Modal de confirmação para cancelamento da edição */}
      <Modal
        isOpen={isCancelModalOpen}
        title="Cancelar Edição"
        message="deseja cancelar a edição?"
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseCancelModal}
      />
    </div>
  );
};

export default EditarContato;
