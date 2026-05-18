import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { SalesManagement } from './pages/SalesManagement';
import { DigitalCatalog } from './pages/DigitalCatalog';
import { InvoicesPlaceholder } from './pages/InvoicesPlaceholder';
import { ClientsPlaceholder } from './pages/ClientsPlaceholder';

function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Secure Admin Portal Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ventas" element={<SalesManagement />} />
            <Route path="/inventario" element={<DigitalCatalog />} />
            <Route path="/facturas" element={<InvoicesPlaceholder />} />
            <Route path="/clientes" element={<ClientsPlaceholder />} />
          </Route>

          {/* Fallback Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}

export default App;
