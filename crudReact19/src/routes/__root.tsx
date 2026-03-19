import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

// Rota raiz - mantendo como createRootRoute
export const Route = createRootRoute({
  component: () => (
    <div className="app-container">
      <nav>
        <Link to="/" className="nav-link">
          Listagem
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  ),
})
