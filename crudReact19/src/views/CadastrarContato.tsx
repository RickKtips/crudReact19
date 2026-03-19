import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IMaskInput } from 'react-imask';
import { useNavigate } from '@tanstack/react-router';
import { useContactStore } from '../store/useContactStore';

// Esquema de validação usando Zod
const contactSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório').regex(/\(\d{2}\)\d{5}-\d{4}/, 'Formato inválido: (99)99999-9999'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
});

// Inferência dos tipos baseados no esquema
type ContactFormData = z.infer<typeof contactSchema>;

// View de Cadastro de Contato
const CadastrarContato: React.FC = () => {
  const navigate = useNavigate();
  // Função da store do Zustand para adicionar contato
  const { addContact } = useContactStore();

  // Configuração do formulário com React Hook Form e Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = (data: ContactFormData) => {
    // Gerar um ID aleatório para o novo contato
    const newContact = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
    };
    // Salvar o novo contato na store do Zustand
    addContact(newContact);
    // Redirecionar para a listagem
    navigate({ to: '/' });
  };

  // Função para retornar à listagem ao clicar em cancelar
  const handleCancel = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Contato</h2>
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
          <button type="submit" className="btn-submit">Cadastrar</button>
          <button type="button" onClick={handleCancel} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarContato;
