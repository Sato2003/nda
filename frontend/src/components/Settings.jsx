import { useState } from 'react';
import { api } from '../api';

export const Settings = ({ user, onLogout }) => {
  const displayName = user.displayName || user.name || user.email?.split('@')[0] || 'User';
  const initials = displayName.split(/[\s@]/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [notifyExpiry, setNotifyExpiry] = useState(true);
  const [notifyNew, setNotifyNew] = useState(true);
  const [notifySigned, setNotifySigned] = useState(false);

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0',
    borderRadius: '8px', fontSize: '13.5px', boxSizing: 'border-box', outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: '12.5px', fontWeight: '600',
    color: '#374151', marginBottom: '5px',
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) { setPwMessage('Please fill in both fields.'); return; }
    setLoading(true);
    try {
      await api.updatePassword({ currentPassword, newPassword });
      setPwMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPwMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ on, onToggle }) => (
    <div
      onClick={onToggle}
      style={{
        width: '40px', height: '22px', borderRadius: '20px', cursor: 'pointer',
        background: on ? '#2563eb' : '#cbd5e1', position: 'relative', flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute', width: '16px', height: '16px', borderRadius: '50%',
        background: 'white', top: '3px', left: on ? '21px' : '3px', transition: 'left 0.2s',
      }} />
    </div>
  );

  const ToggleRow = ({ label, sub, on, onToggle }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
      <div>
        <div style={{ fontSize: '13.5px', color: '#0f172a' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{sub}</div>
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  );

  return (
    <div className="app-page">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Settings</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Manage your account and preferences</div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Profile</div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: 'white' }}>{initials}</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{displayName}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div>
              <div style={{ marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', textTransform: 'capitalize' }}>{user.role || 'employee'}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Security</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Update your password</div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="responsive-form-grid">
            <div>
              <label style={labelStyle}>Current Password</label>
              <input style={inputStyle} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>New Password</label>
              <input style={inputStyle} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
          </div>
          {pwMessage && (
            <div style={{ padding: '10px 12px', borderRadius: '8px', fontSize: '13px', background: pwMessage === 'Password updated successfully.' ? '#dcfce7' : '#fee2e2', color: pwMessage === 'Password updated successfully.' ? '#16a34a' : '#dc2626' }}>
              {pwMessage}
            </div>
          )}
          <button onClick={handlePasswordChange} disabled={loading} style={{ alignSelf: 'flex-start', background: loading ? '#94a3b8' : '#2563eb', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13.5px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Notifications</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Control what you get notified about</div>
        </div>
        <div style={{ padding: '0 20px' }}>
          <ToggleRow label="NDA expiry reminders" sub="Get notified 30 days before expiry" on={notifyExpiry} onToggle={() => setNotifyExpiry((v) => !v)} />
          <ToggleRow label="New NDA requests" sub="Email when a new NDA is assigned to you" on={notifyNew} onToggle={() => setNotifyNew((v) => !v)} />
          <ToggleRow label="Signing confirmations" sub="Email when an NDA is signed" on={notifySigned} onToggle={() => setNotifySigned((v) => !v)} />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #fca5a5', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #fca5a5' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#dc2626' }}>Session</div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Sign out of your current MongoDB-backed session.
          </div>
          <button onClick={onLogout} style={{ alignSelf: 'flex-start', background: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
