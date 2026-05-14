import { useEffect, useState } from 'react';
import { api } from '../api';
import { openNdaPrintPreview } from '../utils/ndaDocument';

const getStatusBadge = (status, expirationDate) => {
  if (status === 'revoked') return { text: 'REVOKED', color: '#7c3aed', bg: '#ede9fe' };
  if (status === 'signed') {
    const days = Math.ceil((new Date(expirationDate) - new Date()) / 86400000);
    if (days < 0) return { text: 'EXPIRED', color: '#dc2626', bg: '#fee2e2' };
    if (days < 30) return { text: 'EXPIRING SOON', color: '#ea580c', bg: '#ffedd5' };
    return { text: 'SIGNED', color: '#16a34a', bg: '#dcfce7' };
  }
  return { text: 'PENDING', color: '#d97706', bg: '#fef3c7' };
};

export const MyNDAs = ({ user }) => {
  const [ndas, setNdas] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyNDAs();
  }, []);

  const fetchMyNDAs = async () => {
    try {
      const data = await api.getNdas(user.email);
      setNdas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const signNDA = async (ndaDocId) => {
    const now = new Date().toISOString();
    await api.signNda(ndaDocId, {
      signedAt: now,
      signerEmail: user.email,
      signerName: user.displayName || user.email,
    });

    fetchMyNDAs();
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'signed', label: 'Signed' },
    { key: 'expiring', label: 'Expiring Soon' },
    { key: 'expired', label: 'Expired' },
    { key: 'revoked', label: 'Revoked' },
  ];

  const filteredNDAs = ndas.filter((nda) => {
    const days = Math.ceil((new Date(nda.expirationDate) - new Date()) / 86400000);
    if (filter === 'pending') return nda.status === 'pending';
    if (filter === 'signed') return nda.status === 'signed' && days >= 30;
    if (filter === 'expiring') return nda.status === 'signed' && days >= 0 && days < 30;
    if (filter === 'expired') return new Date(nda.expirationDate) < new Date();
    if (filter === 'revoked') return nda.status === 'revoked';
    return true;
  });

  return (
    <div className="app-page">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>My NDAs</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>All your non-disclosure agreements</div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>NDA Records</span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  padding: '5px 13px',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  background: filter === item.key ? '#1e3c72' : '#f1f5f9',
                  color: filter === item.key ? 'white' : '#64748b',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredNDAs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>No records</div>
            <div style={{ fontWeight: '600' }}>No NDAs found</div>
          </div>
        ) : (
          <div className="responsive-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['NDA ID', 'TYPE', 'PARTNER', 'CREATED', 'EXPIRES', 'STATUS', 'ACTIONS'].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        color: '#94a3b8',
                        letterSpacing: '0.8px',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredNDAs.map((nda) => {
                  const badge = getStatusBadge(nda.status, nda.expirationDate);
                  return (
                    <tr
                      key={nda.id}
                      style={{ borderBottom: '1px solid #f8fafc' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#475569', fontWeight: '500' }}>
                        {nda.ndaId}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: '#334155' }}>{nda.ndaType || '-'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{nda.partnerName}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{nda.partnerEmail}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                        {new Date(nda.generatedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                        {new Date(nda.expirationDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                          }}
                        >
                          {badge.text}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          {nda.status !== 'signed' && nda.status !== 'revoked' && (
                            <button
                              onClick={() => signNDA(nda.id)}
                              style={{
                                background: '#dcfce7',
                                color: '#16a34a',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '11.5px',
                                fontWeight: '500',
                              }}
                            >
                              Sign
                            </button>
                          )}
                          <button
                            onClick={() => openNdaPrintPreview(nda)}
                            style={{
                              background: '#eff6ff',
                              color: '#2563eb',
                              padding: '5px 10px',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '11.5px',
                              fontWeight: '500',
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => openNdaPrintPreview(nda)}
                            style={{
                              background: '#f1f5f9',
                              color: '#475569',
                              padding: '5px 10px',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '11.5px',
                              fontWeight: '500',
                            }}
                          >
                            PDF
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
    </div>
  );
};
