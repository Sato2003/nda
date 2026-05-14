import { useState } from 'react';
import { api } from '../api';
import { NDA_TEMPLATE_NAMES } from '../data/ndaTemplates';
import { openNdaPrintPreview } from '../utils/ndaDocument';

export const RequestNewNDA = ({ user, onSuccess, initialType }) => {
  const [selectedType, setSelectedType] = useState(initialType || 'Mutual NDA');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [disclosingAddress, setDisclosingAddress] = useState('');
  const [receivingAddress, setReceivingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);
  const [lastNDA, setLastNDA] = useState(null);

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '13.5px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const clearForm = () => {
    setPartnerName('');
    setPartnerEmail('');
    setDisclosingAddress('');
    setReceivingAddress('');
    setNotes('');
  };

  const generateNDA = async () => {
    if (!partnerName || !partnerEmail) {
      alert('Please fill in partner name and email');
      return;
    }

    setLoading(true);

    try {
      const ndaId = `NDA-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 9000) + 1000,
      )}`;
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + parseInt(duration, 10));
      const generatedDate = new Date().toISOString();

      const ndaData = {
        ndaId,
        ndaType: selectedType,
        signerName: user.displayName || user.email,
        signerEmail: user.email,
        partnerName,
        partnerEmail,
        companyName: 'TechGuard Solutions Inc.',
        disclosingAddress: disclosingAddress || '123 Business Ave, Wilmington, DE 19801',
        receivingAddress: receivingAddress || '[To be provided]',
        notes,
        generatedDate,
        expirationDate: expirationDate.toISOString(),
        status: 'pending',
      };

      await api.createNda(ndaData);
      setLastNDA(ndaData);
      clearForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (lastNDA) {
    return (
      <div className="app-page">
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '40px',
            maxWidth: '560px',
            margin: '40px auto',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>OK</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
            NDA Generated Successfully!
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{lastNDA.ndaType}</div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#2563eb',
              background: '#eff6ff',
              padding: '6px 14px',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '24px',
            }}
          >
            {lastNDA.ndaId}
          </div>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginBottom: '8px',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}
            >
              Details
            </div>
            <div style={{ fontSize: '13px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>
                <strong>Partner:</strong> {lastNDA.partnerName}
              </div>
              <div>
                <strong>Email:</strong> {lastNDA.partnerEmail}
              </div>
              <div>
                <strong>Expires:</strong>{' '}
                {new Date(lastNDA.expirationDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div>
                <strong>Status:</strong> <span style={{ color: '#d97706', fontWeight: '600' }}>PENDING</span>
              </div>
            </div>
          </div>

          <div className="stack-actions" style={{ justifyContent: 'center' }}>
            <button
              onClick={() => openNdaPrintPreview(lastNDA)}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              View / Print NDA
            </button>
            <button
              onClick={() => {
                setLastNDA(null);
                if (onSuccess) onSuccess();
              }}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Go to My NDAs
            </button>
            <button
              onClick={() => setLastNDA(null)}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              New NDA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Request New NDA</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fill in the details to generate a new agreement</div>
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Step 1 - Choose NDA Type</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Select the type of agreement that fits your use case</div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {NDA_TEMPLATE_NAMES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '5px 11px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                border: 'none',
                background: selectedType === type ? '#2563eb' : '#f1f5f9',
                color: selectedType === type ? 'white' : '#64748b',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Step 2 - Party Details</div>
        </div>
        <div className="responsive-form-grid" style={{ padding: '20px' }}>
          <div>
            <label style={labelStyle}>Partner / Company Name *</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Acme Corporation"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Partner Email *</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="partner@company.com"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Disclosing Party Address</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="123 Business Ave, Wilmington, DE"
              value={disclosingAddress}
              onChange={(e) => setDisclosingAddress(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Receiving Party Address</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Your address"
              value={receivingAddress}
              onChange={(e) => setReceivingAddress(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Additional Notes (optional)</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              placeholder="Any special terms or clauses..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Step 3 - Duration</div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ maxWidth: '200px' }}>
            <label style={labelStyle}>Duration</label>
            <select style={inputStyle} value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stack-actions">
        <button
          onClick={generateNDA}
          disabled={loading}
          style={{
            flex: 1,
            background: loading ? '#94a3b8' : '#2563eb',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Generating...' : 'Generate NDA'}
        </button>
        <button
          onClick={clearForm}
          style={{
            flex: 1,
            background: '#f1f5f9',
            color: '#475569',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
