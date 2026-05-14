import { useState, useEffect } from 'react';
import { api } from '../api';

export const ActivityLog = ({ user }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    try {
      const data = await api.getActivityLogs(user.email);
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStyle = (type) => {
    if (type === 'signed')  return { icon: '✍️', color: '#16a34a', bg: '#dcfce7', label: 'NDA Signed' };
    if (type === 'revoked') return { icon: '🚫', color: '#dc2626', bg: '#fee2e2', label: 'NDA Revoked' };
    return { icon: '📄', color: '#2563eb', bg: '#eff6ff', label: 'NDA Created' };
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app-page">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Activity Log</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>A history of all actions on your NDAs</div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Recent Activity</span>
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#94a3b8' }}>
            {logs.length} event{logs.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
            <div>Loading activity...</div>
          </div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>📭</div>
            <div style={{ fontWeight: '600' }}>No activity yet</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Generate an NDA to see activity here</div>
          </div>
        ) : (
          <div style={{ padding: '8px 20px 20px' }}>
            {logs.map((log, i) => {
              const s = getStyle(log.type);
              return (
                <div key={log.id} style={{ display: 'flex', gap: '14px', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: s.bg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '16px',
                    }}>{s.icon}</div>
                    {i < logs.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: '#f1f5f9', marginTop: '6px', minHeight: '20px' }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#0f172a' }}>{s.label}</div>
                        <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>{log.description}</div>
                        <div style={{
                          display: 'inline-block', marginTop: '4px',
                          fontFamily: 'monospace', fontSize: '11px',
                          color: s.color, background: s.bg,
                          padding: '2px 8px', borderRadius: '4px',
                        }}>{log.ndaId}</div>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {formatDate(log.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
