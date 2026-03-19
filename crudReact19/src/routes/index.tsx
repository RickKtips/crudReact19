import { createFileRoute } from '@tanstack/react-router'
import Listagem from '../views/Listagem'

export const Route = createFileRoute('/')({
  component: Listagem,
})
