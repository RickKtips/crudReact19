import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import Listagem from '../views/Listagem'

// Rota para '/' - usando createRoute para definição manual
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Listagem,
})
