import { createFileRoute } from '@tanstack/react-router'
import EditarContato from '../views/EditarContato'

export const Route = createFileRoute('/editar/$id')({
  component: EditarContato,
})
