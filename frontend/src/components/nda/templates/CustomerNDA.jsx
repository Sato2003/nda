export const CustomerNDA = ({ nda, escapeHtml, formatDate }) => {
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Customer NDA - ${nda.ndaId}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 50px; }
    .wrapper { border: 1px solid #cbd5e0; padding: 30px; border-radius: 12px; }
    .client-header { background: #2d3748; color: white; padding: 20px; margin: -30px -30px 20px -30px; border-radius: 12px 12px 0 0; text-align: center; }
    .client-header h1 { font-size: 18px; margin: 0; }
    .client-info { display: flex; gap: 30px; margin: 20px 0; padding: 15px; background: #f7fafc; border-radius: 8px; }
    .data-types { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin: 15px 0; }
    .data-badge { background: #ebf8ff; padding: 6px 12px; border-radius: 20px; font-size: 11px; text-align: center; }
    .sig-section { margin-top: 45px; display: flex; gap: 30px; }
    .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #a0aec0; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="client-header">
    <h1>CUSTOMER NON-DISCLOSURE AGREEMENT</h1>
    <p>Client Data Protection & Confidentiality</p>
  </div>

  <p>This Customer NDA is made between:</p>

  <div class="client-info">
    <div style="flex:1">
      <strong>SERVICE PROVIDER:</strong><br>
      ${nda.companyName || 'TechGuard Solutions Inc.'}<br>
      ${nda.disclosingAddress || '123 Business Ave, Wilmington, DE 19801'}
    </div>
    <div style="flex:1">
      <strong>CUSTOMER:</strong><br>
      ${nda.partnerName}<br>
      ${nda.partnerEmail}<br>
      ${nda.receivingAddress || 'Customer Address'}
    </div>
  </div>

  <p><strong>Effective Date:</strong> ${new Date(nda.generatedDate).toLocaleDateString()}<br>
  <strong>NDA ID:</strong> ${nda.ndaId}</p>

  <h3>1. PURPOSE</h3>
  <p>This Agreement protects confidential information exchanged between the Service Provider and Customer in connection with service delivery, onboarding, support, or ongoing business relationship.</p>

  <h3>2. CONFIDENTIAL INFORMATION INCLUDES</h3>
  <div class="data-types">
    <div class="data-badge">Customer Data & Records</div>
    <div class="data-badge">Account Credentials</div>
    <div class="data-badge">Implementation Details</div>
    <div class="data-badge">Support Communications</div>
    <div class="data-badge">Pricing & Contract Terms</div>
    <div class="data-badge">Technical Environments</div>
    <div class="data-badge">Usage Analytics</div>
    <div class="data-badge">Business Strategies</div>
  </div>

  <h3>3. SERVICE PROVIDER OBLIGATIONS</h3>
  <ul>
    <li>Use Customer Confidential Information ONLY to deliver agreed services</li>
    <li>Implement industry-standard security measures to protect customer data</li>
    <li>Not disclose customer information to third parties without explicit consent</li>
    <li>Limit employee access to personnel directly servicing the account</li>
    <li>Notify Customer immediately of any actual or suspected data breach</li>
    <li>Not use customer data for competitive analysis or benchmarking</li>
  </ul>

  <h3>4. CUSTOMER OBLIGATIONS</h3>
  <ul>
    <li>Not misuse Service Provider's proprietary tools, methodologies, or pricing</li>
    <li>Protect access credentials provided by the Service Provider</li>
    <li>Not reverse engineer or copy Service Provider's software or systems</li>
  </ul>

  <h3>5. DATA BREACH NOTIFICATION</h3>
  <p>The Service Provider agrees to notify Customer within <strong>48 hours</strong> of discovering any unauthorized access, disclosure, or loss of Customer Confidential Information, and will provide regular updates on remediation efforts.</p>

  <h3>6. DATA RETENTION AND DELETION</h3>
  <p>Upon termination of services, the Service Provider will securely delete Customer Confidential Information within <strong>30 days</strong>, except where retention is required by law.</p>

  <h3>7. TERM</h3>
  <p>This Agreement remains effective during the customer relationship and continues for <strong>three (3) years</strong> after termination.</p>

  ${nda.notes ? `<h3>8. SPECIAL TERMS</h3><p>${nda.notes}</p>` : ''}

  <div class="sig-section">
    <div style="flex:1">
      <strong>SERVICE PROVIDER:</strong><br>
      Signature: _________________________<br>
      Name: _________________<br>
      Date: ${new Date().toLocaleDateString()}
    </div>
    <div style="flex:1">
      <strong>CUSTOMER:</strong><br>
      Signature: _________________________<br>
      Name: ${nda.partnerName}<br>
      Date: _________________
    </div>
  </div>

  <div class="footer">
    Customer NDA ${nda.ndaId} | Protect Client Trust | Unauthorized Disclosure = Contract Breach
  </div>
</div>
</body>
</html>
`;
};