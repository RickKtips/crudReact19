import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './assets/styles.scss'

// Import das definições de rotas
import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './routes/index'
import { Route as cadastrarRoute } from './routes/cadastrar'
import { Route as editarRoute } from './routes/editar.$id'

// Construção da árvore de rotas vinculando os filhos à raiz
const routeTree = rootRoute.addChildren([
  indexRoute,
  cadastrarRoute,
  editarRoute,
])

// Instância do roteador com a árvore de rotas corrigida
const router = createRouter({ routeTree })

// Registro do roteador para inferência de tipos
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Renderização do app no elemento root
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
