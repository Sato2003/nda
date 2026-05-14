import { useEffect, useState } from 'react';
import { api } from '../api';

export const Reports = ({ user }) => {
  const [ndas, setNdas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNdas();
  }, []);

  const fetchNdas = async () => {
    try {
      const data = await api.getNdas(user.email);
      setNdas(data);
    } catch (err) {
      console.error('Error fetching NDAs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const total = ndas.length;
    const signed = ndas.filter(n => n.status === 'signed').length;
    const pending = ndas.filter(n => n.status === 'pending').length;
    const revoked = ndas.filter(n => n.status === 'revoked').length;
    const expired = ndas.filter(n => new Date(n.expirationDate) < new Date()).length;
    const expiringSoon = ndas.filter(n => {
      const daysLeft = Math.ceil((new Date(n.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
      return n.status === 'signed' && daysLeft > 0 && daysLeft <= 30;
    }).length;

    return { total, signed, pending, revoked, expired, expiringSoon };
  };

  // NDA Type distribution
  const getTypeDistribution = () => {
    const distribution = {};
    ndas.forEach(nda => {
      const type = nda.ndaType || 'Other';
      distribution[type] = (distribution[type] || 0) + 1;
    });
    return Object.entries(distribution).sort((a, b) => b[1] - a[1]);
  };

  // Monthly activity (last 6 months)
  const getMonthlyActivity = () => {
    const months = {};
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      months[monthKey] = 0;
    }

    ndas.forEach(nda => {
      const createdDate = new Date(nda.generatedDate);
      const monthKey = createdDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (months[monthKey] !== undefined) {
        months[monthKey]++;
      }
    });

    return Object.entries(months);
  };

  // Expiring soon list
  const getExpiringSoon = () => {
    return ndas
      .filter(nda => {
        const daysLeft = Math.ceil((new Date(nda.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
        return nda.status === 'signed' && daysLeft > 0 && daysLeft <= 30;
      })
      .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
  };

  // Pending signatures
  const getPendingSignatures = () => {
    return ndas.filter(nda => nda.status === 'pending');
  };

  const stats = calculateStats();
  const typeDistribution = getTypeDistribution();
  const monthlyActivity = getMonthlyActivity();
  const expiringSoon = getExpiringSoon();
  const pendingSignatures = getPendingSignatures();
  const maxMonthlyValue = Math.max(...monthlyActivity.map(([, count]) => count), 1);

  if (loading) {
    return (
      <div className="app-page" style={{ textAlign: 'center', padding: '60px' }}>
        <div>Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="app-page">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>📊 Reports & Analytics</div>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Overview of your NDA activity and insights
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        {[
          { label: 'Total NDAs', value: stats.total, icon: '📄' },
          { label: 'Signed', value: stats.signed, icon: '✅' },
          { label: 'Pending', value: stats.pending, icon: '⏳' },
          { label: 'Expired', value: stats.expired, icon: '⚠️' },
          { label: 'Revoked', value: stats.revoked, icon: '🚫' },
          { label: 'Expiring Soon', value: stats.expiringSoon, icon: '🔔' },
        ].map((item, idx) => (
          <div key={idx} style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            background: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e3a5f' }}>{item.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        
        {/* NDA Type Distribution */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>NDA Type Distribution</div>
          </div>
          <div style={{ padding: '16px' }}>
            {typeDistribution.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '30px' }}>No NDAs yet</div>
            ) : (
              typeDistribution.map(([type, count]) => {
                const percentage = stats.total === 0 ? 0 : (count / stats.total) * 100;
                return (
                  <div key={type} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span>{type}</span>
                      <span style={{ fontWeight: '600' }}>{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, background: '#1e3a5f', height: '100%' }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Monthly Activity Chart */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{ fontWeight: '700', fontSize: '15px' }}>Monthly Activity (Last 6 Months)</div>
          </div>
          <div style={{ padding: '16px' }}>
            {monthlyActivity.every(([, count]) => count === 0) ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '30px' }}>No activity yet</div>
            ) : (
              monthlyActivity.map(([month, count]) => {
                const barWidth = (count / maxMonthlyValue) * 100;
                return (
                  <div key={month} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span>{month}</span>
                      <span style={{ fontWeight: '600' }}>{count} NDA{count !== 1 ? 's' : ''}</span>
                    </div>
                    <div style={{ background: '#e2e8f0', height: '30px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${barWidth}%`, 
                        background: '#2c5282', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {count > 0 ? count : ''}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Expiring Soon Section */}
      <div style={{ marginTop: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ fontWeight: '700', fontSize: '15px' }}>🔔 Expiring Soon (Next 30 Days)</div>
        </div>
        <div style={{ padding: '16px' }}>
          {expiringSoon.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '30px' }}>
              No NDAs expiring in the next 30 days
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>NDA ID</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Partner</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Expires</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Days Left</th>
                  </tr>
                </thead>
                <tbody>
                  {expiringSoon.map(nda => {
                    const daysLeft = Math.ceil((new Date(nda.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={nda.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>{nda.ndaId}</td>
                        <td style={{ padding: '10px', fontSize: '13px' }}>{nda.partnerName}</td>
                        <td style={{ padding: '10px', fontSize: '12px' }}>{nda.ndaType || '-'}</td>
                        <td style={{ padding: '10px', fontSize: '12px' }}>{new Date(nda.expirationDate).toLocaleDateString()}</td>
                        <td style={{ padding: '10px', fontSize: '12px', fontWeight: '600', color: daysLeft <= 7 ? '#d32f2f' : '#ed6c02' }}>
                          {daysLeft} days
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

      {/* Pending Signatures Section */}
      <div style={{ marginTop: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ fontWeight: '700', fontSize: '15px' }}>⏳ Pending Signatures</div>
        </div>
        <div style={{ padding: '16px' }}>
          {pendingSignatures.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '30px' }}>
              No pending signatures - all NDAs are signed!
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>NDA ID</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Partner</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Created</th>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Days Waiting</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSignatures.map(nda => {
                    const daysWaiting = Math.ceil((new Date() - new Date(nda.generatedDate)) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={nda.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>{nda.ndaId}</td>
                        <td style={{ padding: '10px', fontSize: '13px' }}>{nda.partnerName}</td>
                        <td style={{ padding: '10px', fontSize: '12px' }}>{nda.ndaType || '-'}</td>
                        <td style={{ padding: '10px', fontSize: '12px' }}>{new Date(nda.generatedDate).toLocaleDateString()}</td>
                        <td style={{ padding: '10px', fontSize: '12px', fontWeight: '600', color: daysWaiting > 14 ? '#d32f2f' : '#ed6c02' }}>
                          {daysWaiting} days
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

      {/* Summary Cards */}
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📈</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a5f' }}>
            {stats.total === 0 ? '0%' : ((stats.signed / stats.total) * 100).toFixed(0)}%
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Signature Rate</div>
        </div>
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a5f' }}>{typeDistribution.length}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>NDA Types Used</div>
        </div>
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏢</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a5f' }}>
            {new Set(ndas.map(n => n.partnerName)).size}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Unique Partners</div>
        </div>
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏰</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a5f' }}>{stats.expiringSoon}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Need Renewal</div>
        </div>
      </div>
    </div>
  );
};