import { useState, useEffect } from 'react';
import { api } from '../api';

export const Parties = () => {
  const [parties, setParties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { buildParties(); }, []);

  const buildParties = async () => {
    try {
      const ndas = await api.getNdas();
      const map = {};
      ndas.forEach(nda => {
        const key = nda.partnerEmail;
        if (!map[key]) {
          map[key] = {
            name: nda.partnerName,
            email: nda.partnerEmail,
            activeCount: 0,
            lastActivity: nda.generatedDate,
          };
        }
        if (nda.status === 'signed' || nda.status === 'pending') map[key].activeCount++;
      });
      setParties(Object.values(map));
    } catch (err) { console.error(err); }
  };

  const initials = (name) =>
    name?.split(' ').filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join('') || '?';

  const colors = ['#eff6ff|#1d4ed8', '#dcfce7|#16a34a', '#f3e8ff|#7c3aed', '#fef3c7|#b45309', '#fee2e2|#dc2626'];

  const filtered = parties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-page">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Parties</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Organizations and contacts involved in your NDAs</div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '9px 12px', border: '1.5px solid #e2e8f0',
              borderRadius: '8px', fontSize: '13px', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>👥</div>
            <div>No parties found</div>
          </div>
        ) : (
          <div className="responsive-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['PARTY', 'EMAIL', 'ACTIVE NDAs', 'LAST ACTIVITY'].map(h => (
                    <th key={h} style={{
                      padding: '10px 16px', textAlign: 'left', fontSize: '10.5px',
                      fontWeight: '700', color: '#94a3b8', letterSpacing: '0.6px',
                      borderBottom: '1px solid #f1f5f9',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const [bg, color] = colors[i % colors.length].split('|');
                  return (
                    <tr key={p.email} style={{ borderBottom: '1px solid #f8fafc' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: bg, color, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0,
                          }}>{initials(p.name)}</div>
                          <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{p.name}</div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: '12.5px', color: '#475569' }}>{p.email}</td>
                      <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: '600', color: p.activeCount > 0 ? '#16a34a' : '#dc2626' }}>{p.activeCount}</td>
                      <td style={{ padding: '13px 16px', fontSize: '12.5px', color: '#64748b' }}>
                        {new Date(p.lastActivity).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
