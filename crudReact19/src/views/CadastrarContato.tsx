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
    <div style={containerStyle}>
      <h2>Cadastrar Novo Contato</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="name">Nome:</label>
          <input
            {...register('name')}
            id="name"
            style={inputStyle}
            placeholder="Digite o nome"
          />
          {errors.name && <span style={errorTextStyle}>{errors.name.message}</span>}
        </div>

        <div style={inputGroupStyle}>
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
                style={inputStyle}
                placeholder="(99)99999-9999"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone.message}</span>}
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="email">E-mail:</label>
          <input
            {...register('email')}
            id="email"
            style={inputStyle}
            placeholder="exemplo@email.com"
          />
          {errors.email && <span style={errorTextStyle}>{errors.email.message}</span>}
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>Cadastrar</button>
          <button type="button" onClick={handleCancel} style={cancelButtonStyle}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

// Estilos básicos inline para o formulário
const containerStyle: React.CSSProperties = {
  maxWidth: '500px',
  margin: '0 auto',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  color: '#333',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const errorTextStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '12px',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const submitButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default CadastrarContato;
