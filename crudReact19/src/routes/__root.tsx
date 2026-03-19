import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

// Rota raiz que serve como layout para a aplicação
export const Route = createRootRoute({
  component: () => (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#f8f9fa' }}>
        <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
          Listagem
        </Link>
      </nav>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  ),
})
