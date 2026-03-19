import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import CadastrarContato from '../views/CadastrarContato'

// Rota para '/cadastrar' - usando createRoute para definição manual
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cadastrar',
  component: CadastrarContato,
})
