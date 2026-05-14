import { useState } from 'react';
import { api } from '../api';

const RESET_SUCCESS_MESSAGE = 'Password updated. You can log in with your new password now.';

const getAuthMessage = (error) =>
  error?.message || 'Something went wrong. Please try again.';

export const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const normalizedEmail = email.trim().toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = await api.login({
          email: normalizedEmail,
          password
        });
        onLogin(user);
      } else {
        if (!firstName || !lastName) {
          setError('First name and last name are required.');
          setLoading(false);
          return;
        }

        const user = await api.register({
          firstName,
          lastName,
          middleInitial,
          email: normalizedEmail,
          password
        });

        setFirstName('');
        setLastName('');
        setMiddleInitial('');
        onLogin(user);
      }
    } catch (err) {
      setError(getAuthMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail || !resetPassword) {
      setResetMessage('Please enter your email address and a new password.');
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword({
        email: resetEmail.trim().toLowerCase(),
        newPassword: resetPassword
      });
      setResetMessage(RESET_SUCCESS_MESSAGE);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage('');
        setResetEmail('');
        setResetPassword('');
      }, 2500);
    } catch (err) {
      setResetMessage(getAuthMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-shell"
    >
      <div
        className="auth-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3c72', marginBottom: '8px' }}>
            NDA MANAGEMENT SYSTEM
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Generate, Store & Track Non-Disclosure Agreements</p>
        </div>

        <div style={{ display: 'flex', marginBottom: '30px', gap: '10px', flexWrap: 'wrap' }}>
          <button
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              background: isLogin ? '#1e3c72' : '#f0f0f0',
              color: isLogin ? 'white' : '#666'
            }}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              background: !isLogin ? '#1e3c72' : '#f0f0f0',
              color: !isLogin ? 'white' : '#666'
            }}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        {error && (
          <div
            style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
                required
              />
              <input
                type="text"
                placeholder="Middle Initial (e.g. A)"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
                maxLength={1}
                style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#9ca3af' : '#1e3c72',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}
          >
            {loading ? 'Please wait...' : isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => setShowForgotPassword(true)}
            style={{ background: 'none', border: 'none', color: '#1e3c72', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
          >
            Reset Password
          </button>
        </div>

        {showForgotPassword && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 style={{ marginBottom: '16px', color: '#1e3c72' }}>Reset Password</h3>
              <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
                Enter your email address and choose a new password.
              </p>
              <input
                type="email"
                placeholder="Email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' }}
              />
              <input
                type="password"
                placeholder="New password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
              />
              {resetMessage && (
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    background: resetMessage === RESET_SUCCESS_MESSAGE ? '#dcfce7' : '#fee2e2',
                    color: resetMessage === RESET_SUCCESS_MESSAGE ? '#16a34a' : '#dc2626'
                  }}
                >
                  {resetMessage}
                </div>
              )}
              <div className="stack-actions">
                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  style={{ flex: 1, background: loading ? '#9ca3af' : '#1e3c72', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetMessage('');
                    setResetEmail('');
                    setResetPassword('');
                  }}
                  style={{ flex: 1, background: '#9ca3af', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
