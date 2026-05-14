import { useEffect, useState } from 'react';
import { api } from './api';
import { Login } from './components/Login';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import './index.css';

const normalizeUser = (user) => ({
  ...user,
  displayName: user?.name || user?.email
});

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!api.getStoredToken()) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await api.getCurrentUser();
        const normalizedUser = normalizeUser(currentUser);
        setUser(normalizedUser);
        setIsAdmin(normalizedUser.role === 'admin' || normalizedUser.email?.includes('admin'));
      } catch (_error) {
        api.clearSession();
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const handleLogin = (nextUser) => {
    const normalizedUser = normalizeUser(nextUser);
    setUser(normalizedUser);
    setIsAdmin(normalizedUser.role === 'admin' || normalizedUser.email?.includes('admin'));
  };

  const handleLogout = () => {
    api.clearSession();
    setUser(null);
    setIsAdmin(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return isAdmin
    ? <AdminDashboard user={user} onLogout={handleLogout} />
    : <EmployeeDashboard user={user} onLogout={handleLogout} />;
}

export default App;
