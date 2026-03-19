import { createFileRoute } from '@tanstack/react-router'
import CadastrarContato from '../views/CadastrarContato'

export const Route = createFileRoute('/cadastrar')({
  component: CadastrarContato,
})
