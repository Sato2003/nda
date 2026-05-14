import { useEffect, useState } from 'react';
import { api } from '../api';
import { useResponsive } from '../hooks/useResponsive';

const NDA_TYPES = [
  { icon: 'UNI', label: 'Unilateral NDA', group: 1 },
  { icon: 'MUT', label: 'Mutual NDA', group: 1 },
  { icon: 'MLT', label: 'Multilateral NDA', group: 1 },
  { icon: 'EMP', label: 'Employee NDA', group: 2 },
  { icon: 'VND', label: 'Contractor/Vendor NDA', group: 2 },
  { icon: 'INV', label: 'Investor NDA', group: 2 },
  { icon: 'CUS', label: 'Customer NDA', group: 2 },
  { icon: 'GEN', label: 'Standard/General NDA', group: 2 },
  { icon: 'CFG', label: 'Confidentiality Agreement', group: 3 },
  { icon: 'NCA', label: 'Non-Circumvention Agreement', group: 3 },
  { icon: 'NUD', label: 'Non-Use NDA', group: 3 },
];

export const AdminDashboard = ({ user, onLogout }) => {
  const { isMobile } = useResponsive();
  const [ndas, setNdas] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('ndas');
  const [activeNdaType, setActiveNdaType] = useState('Unilateral NDA');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAllNDAs();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const fetchAllNDAs = async () => {
    const data = await api.getNdas();
    setNdas(data);
  };

  const fetchUsers = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  const revokeNDA = async (ndaId) => {
    if (!window.confirm('Revoke this NDA?')) return;
    await api.revokeNda(ndaId, { revokedAt: new Date().toISOString(), revokedBy: user.email });
    fetchAllNDAs();
  };

  const deleteNDA = async (ndaId) => {
    if (!window.confirm('Permanently delete this NDA?')) return;
    await api.deleteNda(ndaId);
    fetchAllNDAs();
  };

  const filteredNDAs = ndas.filter((nda) => {
    if (filter === 'pending') return nda.status === 'pending';
    if (filter === 'signed') return nda.status === 'signed';
    if (filter === 'expired') return new Date(nda.expirationDate) < new Date();
    if (filter === 'revoked') return nda.status === 'revoked';
    return true;
  });

  const stats = {
    total: ndas.length,
    signed: ndas.filter((n) => n.status === 'signed').length,
    pending: ndas.filter((n) => n.status === 'pending').length,
    expired: ndas.filter((n) => new Date(n.expirationDate) < new Date()).length,
    users: users.length,
  };

  const statusColor = (status, exp) => {
    if (status === 'revoked') return { bg: '#f3e8ff', color: '#7c3aed' };
    if (status === 'signed') {
      return new Date(exp) < new Date()
        ? { bg: '#fee2e2', color: '#dc2626' }
        : { bg: '#dcfce7', color: '#16a34a' };
    }
    return { bg: '#fef3c7', color: '#d97706' };
  };

  const statusLabel = (status, exp) => {
    if (status === 'revoked') return 'REVOKED';
    if (status === 'signed') return new Date(exp) < new Date() ? 'EXPIRED' : 'SIGNED';
    return 'PENDING';
  };

  const navItem = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: active ? '#60a5fa' : '#94a3b8',
    fontSize: '12.5px',
    fontWeight: '500',
    background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
    marginBottom: '1px',
    lineHeight: '1.3',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  });

  return (
    <div className={`dashboard-shell${sidebarOpen ? ' sidebar-open' : ''}`} style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="dashboard-overlay" onClick={() => setSidebarOpen(false)} />

      <div className="dashboard-sidebar" style={{ width: '240px', minWidth: '240px', background: '#0f1f3d' }}>
        <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '12px',
            }}
          >
            A
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9', marginBottom: '2px' }}>{user.displayName || 'Admin'}</div>
          <div style={{ fontSize: '11px', color: '#64748b', wordBreak: 'break-all', lineHeight: '1.4' }}>{user.email}</div>
          <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
            Administrator
          </div>
        </div>

        <div style={{ padding: '16px 12px 8px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px', color: '#334155', textTransform: 'uppercase', padding: '0 6px', marginBottom: '8px' }}>
            NDA Types
          </div>
          {NDA_TYPES.map((item, index) => (
            <div key={item.label}>
              {(index === 3 || index === 8) && <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 6px' }} />}
              <button
                onClick={() => {
                  setActiveNdaType(item.label);
                  setSidebarOpen(false);
                }}
                style={navItem(activeNdaType === item.label)}
              >
                <span style={{ fontSize: '11px', minWidth: '28px', textAlign: 'center', fontWeight: '700' }}>{item.icon}</span>
                {item.label}
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <button
          onClick={onLogout}
          style={{
            margin: '0 12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 12px',
            borderRadius: '8px',
            background: 'rgba(220,38,38,0.1)',
            color: '#f87171',
            fontSize: '12.5px',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
            width: 'calc(100% - 24px)',
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-main" style={{ background: '#f1f5f9' }}>
        <div className="dashboard-topbar" style={{ minHeight: isMobile ? 'auto' : '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isMobile && (
              <button className="dashboard-mobile-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open admin navigation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Admin Dashboard</div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Monitor and manage all NDAs and users</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', background: 'white', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
            {[{ key: 'ndas', label: 'NDAs' }, { key: 'users', label: 'Users' }].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '6px 18px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  background: activeTab === tab.key ? '#1e3c72' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#64748b',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-main-scroll">
          <div className="dashboard-main-padding">
            <div className="dashboard-stats-grid" style={{ gridTemplateColumns: isMobile ? undefined : 'repeat(5, minmax(0, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {[
                { label: 'Total NDAs', value: stats.total, color: '#1d4ed8', bg: '#eff6ff', icon: 'ND' },
                { label: 'Signed', value: stats.signed, color: '#16a34a', bg: '#dcfce7', icon: 'SI' },
                { label: 'Pending', value: stats.pending, color: '#d97706', bg: '#fef3c7', icon: 'PE' },
                { label: 'Expired', value: stats.expired, color: '#dc2626', bg: '#fee2e2', icon: 'EX' },
                { label: 'Users', value: stats.users, color: '#7c3aed', bg: '#f3e8ff', icon: 'US' },
              ].map((item) => (
                <div key={item.label} style={{ background: 'white', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `3px solid ${item.color}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {activeTab === 'ndas' && (
              <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>All NDA Records</h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['all', 'pending', 'signed', 'expired', 'revoked'].map((value) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
                        style={{
                          padding: '5px 12px',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '11.5px',
                          fontWeight: '600',
                          background: filter === value ? '#1e3c72' : '#f1f5f9',
                          color: filter === value ? 'white' : '#64748b',
                          textTransform: 'capitalize',
                        }}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                {filteredNDAs.length === 0 ? (
                  <div style={{ padding: '50px', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>No records</div>
                    <div>No NDAs found</div>
                  </div>
                ) : (
                  <div className="responsive-table-wrap">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['NDA ID', 'Signer', 'Partner', 'Type', 'Generated', 'Expires', 'Status', 'Actions'].map((header) => (
                            <th key={header} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10.5px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: '1px solid #f1f5f9' }}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNDAs.map((nda) => {
                          const colors = statusColor(nda.status, nda.expirationDate);
                          return (
                            <tr key={nda.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                              <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '10.5px', color: '#64748b' }}>{nda.ndaId}</td>
                              <td style={{ padding: '12px 14px' }}>
                                <div style={{ fontWeight: '600', fontSize: '12.5px', color: '#0f172a' }}>{nda.signerName}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{nda.signerEmail}</div>
                              </td>
                              <td style={{ padding: '12px 14px', fontSize: '12.5px', color: '#475569' }}>{nda.partnerName}</td>
                              <td style={{ padding: '12px 14px', fontSize: '11.5px', color: '#64748b' }}>{nda.ndaType || '-'}</td>
                              <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b' }}>{new Date(nda.generatedDate).toLocaleDateString()}</td>
                              <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b' }}>{new Date(nda.expirationDate).toLocaleDateString()}</td>
                              <td style={{ padding: '12px 14px' }}>
                                <span style={{ background: colors.bg, color: colors.color, padding: '3px 10px', borderRadius: '20px', fontSize: '10.5px', fontWeight: '700' }}>
                                  {statusLabel(nda.status, nda.expirationDate)}
                                </span>
                              </td>
                              <td style={{ padding: '12px 14px' }}>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                  <button onClick={() => revokeNDA(nda.id)} style={{ background: '#fff7ed', color: '#ea580c', padding: '5px 9px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '500' }}>
                                    Revoke
                                  </button>
                                  <button onClick={() => deleteNDA(nda.id)} style={{ background: '#fee2e2', color: '#dc2626', padding: '5px 9px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '500' }}>
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Registered Users</h3>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{users.length} user(s)</span>
                </div>
                <div className="responsive-table-wrap">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Name', 'Email', 'Role', 'Registered'].map((header) => (
                          <th key={header} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10.5px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: '1px solid #f1f5f9' }}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((currentUser) => (
                          <tr key={currentUser.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '13px 16px', fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{currentUser.name || '-'}</td>
                            <td style={{ padding: '13px 16px', fontSize: '12.5px', color: '#475569' }}>{currentUser.email}</td>
                            <td style={{ padding: '13px 16px' }}>
                              <span style={{ background: currentUser.role === 'admin' ? '#f3e8ff' : '#eff6ff', color: currentUser.role === 'admin' ? '#7c3aed' : '#1d4ed8', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'capitalize' }}>
                                {currentUser.role || 'employee'}
                              </span>
                            </td>
                            <td style={{ padding: '13px 16px', fontSize: '12.5px', color: '#64748b' }}>{currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
